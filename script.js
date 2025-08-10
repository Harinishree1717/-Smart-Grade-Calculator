const gradePoints = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  U: 0,
  SA: 0,
  W: 0,
  AB: 0,
};

let semCount = 0;

// Tab switching
function showSection(section) {
  document.getElementById('sgpa').classList.add('hidden');
  document.getElementById('cgpa').classList.add('hidden');
  document.getElementById(section).classList.remove('hidden');

  document.getElementById('btn-sgpa').classList.remove('active');
  document.getElementById('btn-cgpa').classList.remove('active');
  if (section === 'sgpa') {
    document.getElementById('btn-sgpa').classList.add('active');
  } else {
    document.getElementById('btn-cgpa').classList.add('active');
  }

  // Only clear results when switching tabs
  document.getElementById('sgpaResult').innerHTML = '';
  document.getElementById('cgpaResult').innerHTML = '';
}

// Clears all inputs and results (only if user clicks reset, not on tab switch)
function clearAll() {
  document.getElementById('sgpaForm').innerHTML = '';
  document.getElementById('cgpaForm').innerHTML = '';
  document.getElementById('numSubjects').value = '';
  document.getElementById('numSemesters').value = '';
  document.getElementById('sgpaResult').innerHTML = '';
  document.getElementById('cgpaResult').innerHTML = '';
  document.getElementById('calcSgpaBtn').style.display = 'none';
  document.getElementById('calcCgpaBtn').style.display = 'none';
  semCount = 0;
}

// SGPA Generate Inputs
function generateSubjects() {
  const num = parseInt(document.getElementById('numSubjects').value);
  const form = document.getElementById('sgpaForm');
  form.innerHTML = '';
  if (isNaN(num) || num <= 0) {
    alert('Enter a valid number of subjects');
    return;
  }
  for (let i = 1; i <= num; i++) {
    const div = document.createElement('div');
    div.className = 'subject-row';

    const gradeSelect = document.createElement('select');
    gradeSelect.id = `grade${i}`;
    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'U', 'SA', 'W', 'AB'];
    grades.forEach((g) => {
      const option = document.createElement('option');
      option.value = g;
      option.textContent = g;
      if (g === 'O') option.selected = true;
      gradeSelect.appendChild(option);
    });

    const creditInput = document.createElement('input');
    creditInput.type = 'number';
    creditInput.min = 1;
    creditInput.placeholder = `Course ${i} Credit`;
    creditInput.id = `credit${i}`;

    div.appendChild(gradeSelect);
    div.appendChild(creditInput);

    form.appendChild(div);
  }
  document.getElementById('calcSgpaBtn').style.display = 'block';
  document.getElementById('sgpaResult').innerHTML = '';
}

// SGPA Calculate
function calculateSGPA() {
  const num = parseInt(document.getElementById('numSubjects').value);
  if (isNaN(num) || num <= 0) {
    alert('Enter number of subjects and generate fields');
    return;
  }
  let totalCredits = 0,
    totalPoints = 0;
  for (let i = 1; i <= num; i++) {
    const grade = document.getElementById(`grade${i}`).value;
    const credits = parseInt(document.getElementById(`credit${i}`).value);
    if (!gradePoints.hasOwnProperty(grade) || isNaN(credits) || credits <= 0) {
      alert(`Enter valid grade and credits for subject ${i}`);
      return;
    }
    totalCredits += credits;
    totalPoints += gradePoints[grade] * credits;
  }
  if (totalCredits === 0) {
    alert('Total credits cannot be zero!');
    return;
  }
  const sgpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById('sgpaResult').innerHTML =
    `<span class="emoji">📊</span> Your SGPA is: <strong>${sgpa}</strong>`;
}

// CGPA Generate Inputs with manual number inputs (step 0.5)
function generateSemesters() {
  semCount = parseInt(document.getElementById('numSemesters').value);
  const form = document.getElementById('cgpaForm');
  form.innerHTML = '';
  if (isNaN(semCount) || semCount <= 0) {
    alert('Enter a valid number of semesters');
    return;
  }

  for (let i = 1; i <= semCount; i++) {
    const div = document.createElement('div');
    div.className = 'semester-row';

    const label = document.createElement('label');
    label.textContent = `Semester ${i} SGPA: `;
    label.htmlFor = `sem${i}`;

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1.5;
    input.max = 10;
    input.step = 0.5;
    input.id = `sem${i}`;
    input.placeholder = `Enter Semester ${i} SGPA`;

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  }

  document.getElementById('calcCgpaBtn').style.display = 'block';
  document.getElementById('cgpaResult').innerHTML = '';
}

// Calculate CGPA
function calculateCGPA() {
  if (semCount <= 0) {
    alert('Generate semester inputs first');
    return;
  }
  let total = 0;
  for (let i = 1; i <= semCount; i++) {
    const val = parseFloat(document.getElementById(`sem${i}`).value);
    if (isNaN(val) || val < 1.5 || val > 10) {
      alert(`Enter valid SGPA (1.5 - 10) for semester ${i}`);
      return;
    }
    total += val;
  }
  const cgpa = (total / semCount).toFixed(2);
  document.getElementById('cgpaResult').innerHTML =
    `<span class="emoji">📊</span> Your CGPA is: <strong>${cgpa}</strong>`;

  // Hide calculate button after calculation
  document.getElementById('calcCgpaBtn').style.display = 'none';
}
