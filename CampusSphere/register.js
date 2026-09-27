// ==========================================
// CAMPUSSPHERE REGISTRATION SYSTEM
// ==========================================


// ==========================================
// SHOW REGISTRATION FORM
// ==========================================

function showRegistrationForm() {

    const role =
        document.getElementById("registerRole").value;

    const studentForm =
        document.getElementById("studentForm");

    const teacherForm =
        document.getElementById("teacherForm");

    const adminForm =
        document.getElementById("adminForm");


    // Hide all forms first

    studentForm.style.display = "none";
    teacherForm.style.display = "none";
    adminForm.style.display = "none";


    // Show selected form

    if (role === "student") {

        studentForm.style.display = "block";

    }

    else if (role === "teacher") {

        teacherForm.style.display = "block";

    }

    else if (role === "admin") {

        adminForm.style.display = "block";

    }

}



// ==========================================
// STUDENT REGISTRATION
// ==========================================

function registerStudent() {

    const name =
        document.getElementById("studentName").value.trim();

    const mobile =
        document.getElementById("studentMobile").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const password =
        document.getElementById("studentPassword").value.trim();

    const rollNo =
        document.getElementById("studentRoll").value.trim();

    const branch =
        document.getElementById("studentBranch").value;

    const semester =
        document.getElementById("studentSemester").value;

    const bloodGroup =
        document.getElementById("studentBloodGroup").value;

    const aadhaar =
        document.getElementById("studentAadhaar").value.trim();

    const fatherName =
        document.getElementById("fatherName").value.trim();

    const motherName =
        document.getElementById("motherName").value.trim();

    const dob =
        document.getElementById("studentDOB").value;


    // ======================================
    // REQUIRED FIELD CHECK
    // ======================================

    if (
        !name ||
        !mobile ||
        !email ||
        !password ||
        !rollNo ||
        !branch ||
        !semester ||
        !bloodGroup ||
        !aadhaar ||
        !fatherName ||
        !motherName ||
        !dob
    ) {

        alert(
            "⚠️ Please fill all student registration details."
        );

        return;
    }


    // ======================================
    // MOBILE VALIDATION
    // ======================================

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "⚠️ Please enter a valid 10-digit mobile number."
        );

        return;
    }


    // ======================================
    // EMAIL VALIDATION
    // ======================================

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        alert(
            "⚠️ Please enter a valid email address."
        );

        return;
    }


    // ======================================
    // PASSWORD VALIDATION
    // ======================================

    if (password.length < 6) {

        alert(
            "⚠️ Password must contain at least 6 characters."
        );

        return;
    }


    // ======================================
    // LOAD STUDENTS
    // ======================================

    let students =
        JSON.parse(
            localStorage.getItem(
                "campusSphereStudents"
            )
        ) || [];


    // ======================================
    // DUPLICATE EMAIL CHECK
    // ======================================

    const emailExists =
        students.some(function(student) {

            return student.email.toLowerCase() ===
                   email.toLowerCase();

        });


    if (emailExists) {

        alert(
            "⚠️ This email is already registered."
        );

        return;
    }


    // ======================================
    // DUPLICATE ROLL NUMBER CHECK
    // ======================================

    const rollExists =
        students.some(function(student) {

            return student.rollNo === rollNo;

        });


    if (rollExists) {

        alert(
            "⚠️ This Roll Number is already registered."
        );

        return;
    }


    // ======================================
    // CREATE STUDENT
    // ======================================

    const student = {

        id: Date.now(),

        name: name,

        mobile: mobile,

        email: email,

        password: password,

        rollNo: rollNo,

        branch: branch,

        semester: semester,

        bloodGroup: bloodGroup,

        aadhaar: aadhaar,

        fatherName: fatherName,

        motherName: motherName,

        dob: dob,

        role: "student"

    };


    // ======================================
    // SAVE STUDENT
    // ======================================

    students.push(student);


    localStorage.setItem(
        "campusSphereStudents",
        JSON.stringify(students)
    );


    alert(
        "✅ Student registration successful!"
    );


    window.location.href = "index.html";

}



// ==========================================
// TEACHER REGISTRATION
// ==========================================

function registerTeacher() {

    const name =
        document.getElementById("teacherName").value.trim();

    const teacherId =
        document.getElementById("teacherId").value.trim();

    const mobile =
        document.getElementById("teacherMobile").value.trim();

    const email =
        document.getElementById("teacherEmail").value.trim();

    const password =
        document.getElementById("teacherPassword").value.trim();

    const branch =
        document.getElementById("teacherBranch").value;

    const qualification =
        document.getElementById("teacherQualification").value.trim();

    const dob =
        document.getElementById("teacherDOB").value;


    // ======================================
    // REQUIRED FIELD CHECK
    // ======================================

    if (
        !name ||
        !teacherId ||
        !mobile ||
        !email ||
        !password ||
        !branch ||
        !qualification ||
        !dob
    ) {

        alert(
            "⚠️ Please fill all teacher registration details."
        );

        return;
    }


    // ======================================
    // MOBILE VALIDATION
    // ======================================

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "⚠️ Please enter a valid 10-digit mobile number."
        );

        return;
    }


    // ======================================
    // EMAIL VALIDATION
    // ======================================

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        alert(
            "⚠️ Please enter a valid email address."
        );

        return;
    }


    // ======================================
    // PASSWORD VALIDATION
    // ======================================

    if (password.length < 6) {

        alert(
            "⚠️ Password must contain at least 6 characters."
        );

        return;
    }


    // ======================================
    // LOAD TEACHERS
    // ======================================

    let teachers =
        JSON.parse(
            localStorage.getItem(
                "campusSphereTeachers"
            )
        ) || [];


    // ======================================
    // DUPLICATE EMAIL
    // ======================================

    const emailExists =
        teachers.some(function(teacher) {

            return teacher.email.toLowerCase() ===
                   email.toLowerCase();

        });


    if (emailExists) {

        alert(
            "⚠️ This email is already registered."
        );

        return;
    }


    // ======================================
    // DUPLICATE TEACHER ID
    // ======================================

    const idExists =
        teachers.some(function(teacher) {

            return teacher.teacherId === teacherId;

        });


    if (idExists) {

        alert(
            "⚠️ This Teacher ID is already registered."
        );

        return;
    }


    // ======================================
    // CREATE TEACHER
    // ======================================

    const teacher = {

        id: Date.now(),

        name: name,

        teacherId: teacherId,

        mobile: mobile,

        email: email,

        password: password,

        branch: branch,

        qualification: qualification,

        dob: dob,

        role: "teacher"

    };


    // ======================================
    // SAVE TEACHER
    // ======================================

    teachers.push(teacher);


    localStorage.setItem(
        "campusSphereTeachers",
        JSON.stringify(teachers)
    );


    alert(
        "✅ Teacher registration successful!"
    );


    window.location.href = "index.html";

}



// ==========================================
// ADMIN REGISTRATION
// ==========================================

function registerAdmin() {

    const name =
        document.getElementById("adminName").value.trim();

    const adminId =
        document.getElementById("adminId").value.trim();

    const mobile =
        document.getElementById("adminMobile").value.trim();

    const email =
        document.getElementById("adminEmail").value.trim();

    const password =
        document.getElementById("adminPassword").value.trim();

    const department =
        document.getElementById("adminDepartment").value.trim();

    const dob =
        document.getElementById("adminDOB").value;


    // ======================================
    // REQUIRED FIELD CHECK
    // ======================================

    if (
        !name ||
        !adminId ||
        !mobile ||
        !email ||
        !password ||
        !department ||
        !dob
    ) {

        alert(
            "⚠️ Please fill all admin registration details."
        );

        return;
    }


    // ======================================
    // MOBILE VALIDATION
    // ======================================

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "⚠️ Please enter a valid 10-digit mobile number."
        );

        return;
    }


    // ======================================
    // EMAIL VALIDATION
    // ======================================

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        alert(
            "⚠️ Please enter a valid email address."
        );

        return;
    }


    // ======================================
    // PASSWORD VALIDATION
    // ======================================

    if (password.length < 6) {

        alert(
            "⚠️ Password must contain at least 6 characters."
        );

        return;
    }


    // ======================================
    // LOAD ADMINS
    // ======================================

    let admins =
        JSON.parse(
            localStorage.getItem(
                "campusSphereAdmins"
            )
        ) || [];


    // ======================================
    // DUPLICATE EMAIL
    // ======================================

    const emailExists =
        admins.some(function(admin) {

            return admin.email.toLowerCase() ===
                   email.toLowerCase();

        });


    if (emailExists) {

        alert(
            "⚠️ This email is already registered."
        );

        return;
    }


    // ======================================
    // DUPLICATE ADMIN ID
    // ======================================

    const idExists =
        admins.some(function(admin) {

            return admin.adminId === adminId;

        });


    if (idExists) {

        alert(
            "⚠️ This Admin ID is already registered."
        );

        return;
    }


    // ======================================
    // CREATE ADMIN
    // ======================================

    const admin = {

        id: Date.now(),

        name: name,

        adminId: adminId,

        mobile: mobile,

        email: email,

        password: password,

        department: department,

        dob: dob,

        role: "admin"

    };


    // ======================================
    // SAVE ADMIN
    // ======================================

    admins.push(admin);


    localStorage.setItem(
        "campusSphereAdmins",
        JSON.stringify(admins)
    );


    alert(
        "✅ Admin registration successful!"
    );


    window.location.href = "index.html";

}