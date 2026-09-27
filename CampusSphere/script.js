// ==========================================
// CAMPUSSPHERE - MAIN SCRIPT
// ==========================================


// ==========================================
// LOGIN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    document.getElementById("email").value.trim();

                const password =
                    document.getElementById("password").value.trim();

                const role =
                    document.getElementById("role").value;


                if (
                    email === "" ||
                    password === "" ||
                    role === ""
                ) {

                    alert(
                        "Please fill all login details."
                    );

                    return;
                }


                // STUDENT

                if (role === "student") {

                    alert(
                        "✅ Student Login Successful!"
                    );

                    window.location.href =
                        "dashboard.html";

                    return;
                }


                // ==========================================
                // TEACHER LOGIN
                // ==========================================

                    if (role === "teacher") {

                    // Logged-in teacher ki email save karo
                    localStorage.setItem(
                    "campusSphereLoggedInTeacher",
                    email
                );

                alert("✅ Teacher Login Successful!");

                     window.location.href =
                    "teacher-dashboard.html";

                return; 
                }


                // ADMIN

                if (role === "admin") {

                    alert(
                        "✅ Admin Login Successful!"
                    );

                    window.location.href =
                        "admin-dashboard.html";

                    return;
                }

            }
        );

    }


    // Load available features

    displayAssignments();

    displayStudentAssignments();

    displayPerformance();

    displayTeacherNotices();

    displayAdminNotices();

    loadCertificateRequestCount();

});



// ==========================================
// ASSIGNMENT MANAGEMENT
// ==========================================

function createAssignment() {

    const subject =
        document.getElementById(
            "subject"
        )?.value.trim();

    const title =
        document.getElementById(
            "title"
        )?.value.trim();

    const description =
        document.getElementById(
            "description"
        )?.value.trim();

    const dueDate =
        document.getElementById(
            "dueDate"
        )?.value;

    const marks =
        document.getElementById(
            "marks"
        )?.value.trim();


    if (
        !subject ||
        !title ||
        !description ||
        !dueDate ||
        !marks
    ) {

        alert(
            "Please fill all the fields."
        );

        return;
    }


    const assignment = {

        id: Date.now(),

        subject: subject,

        title: title,

        description: description,

        dueDate: dueDate,

        marks: marks,

        status: "Published"

    };


    let assignments =
        JSON.parse(
            localStorage.getItem(
                "campusSphereAssignments"
            )
        ) || [];


    assignments.push(assignment);


    localStorage.setItem(
        "campusSphereAssignments",
        JSON.stringify(assignments)
    );


    if (document.getElementById("subject"))
        document.getElementById("subject").value = "";

    if (document.getElementById("title"))
        document.getElementById("title").value = "";

    if (document.getElementById("description"))
        document.getElementById("description").value = "";

    if (document.getElementById("dueDate"))
        document.getElementById("dueDate").value = "";

    if (document.getElementById("marks"))
        document.getElementById("marks").value = "";


    alert(
        "✅ Assignment published successfully!"
    );


    displayAssignments();

}



// ==========================================
// DISPLAY TEACHER ASSIGNMENTS
// ==========================================

function displayAssignments() {

    const container =
        document.getElementById(
            "assignmentContainer"
        );


    if (!container) {
        return;
    }


    const assignments =
        JSON.parse(
            localStorage.getItem(
                "campusSphereAssignments"
            )
        ) || [];


    if (assignments.length === 0) {

        container.innerHTML =
            "<p>No assignments published yet.</p>";

        return;
    }


    container.innerHTML = "";


    assignments.forEach(
        function (assignment, index) {

            const card =
                document.createElement("div");


            card.className =
                "assignment-card";


            card.innerHTML = `

                <h3>
                    📚 ${assignment.title}
                </h3>

                <p>
                    <strong>Subject:</strong>
                    ${assignment.subject}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${assignment.description}
                </p>

                <p>
                    <strong>Due Date:</strong>
                    ${assignment.dueDate}
                </p>

                <p>
                    <strong>Maximum Marks:</strong>
                    ${assignment.marks}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${assignment.status}
                </p>

                <button
                    type="button"
                    onclick="deleteAssignment(${index})">

                    🗑️ Delete Assignment

                </button>

            `;


            container.appendChild(card);

        }
    );

}



// ==========================================
// DELETE ASSIGNMENT
// ==========================================

function deleteAssignment(index) {

    let assignments =
        JSON.parse(
            localStorage.getItem(
                "campusSphereAssignments"
            )
        ) || [];


    if (
        !confirm(
            "Are you sure you want to delete this assignment?"
        )
    ) {

        return;
    }


    assignments.splice(index, 1);


    localStorage.setItem(
        "campusSphereAssignments",
        JSON.stringify(assignments)
    );


    displayAssignments();


    alert(
        "🗑️ Assignment deleted successfully."
    );

}



// ==========================================
// STUDENT ASSIGNMENTS
// ==========================================

function displayStudentAssignments() {

    const container =
        document.getElementById(
            "studentAssignmentContainer"
        );


    if (!container) {
        return;
    }


    const assignments =
        JSON.parse(
            localStorage.getItem(
                "campusSphereAssignments"
            )
        ) || [];


    if (assignments.length === 0) {

        container.innerHTML =
            "<p>No assignments available.</p>";

        return;
    }


    container.innerHTML = "";


    assignments.forEach(
        function (assignment) {

            const card =
                document.createElement("div");


            card.className =
                "assignment-card";


            card.innerHTML = `

                <h3>
                    📚 ${assignment.title}
                </h3>

                <p>
                    <strong>Subject:</strong>
                    ${assignment.subject}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${assignment.description}
                </p>

                <p>
                    <strong>Due Date:</strong>
                    ${assignment.dueDate}
                </p>

                <p>
                    <strong>Maximum Marks:</strong>
                    ${assignment.marks}
                </p>

                <button
                    type="button"
                    onclick="alert('Assignment opened')">

                    View Assignment

                </button>

            `;


            container.appendChild(card);

        }
    );

}



// ==========================================
// PERFORMANCE DASHBOARD
// ==========================================

function displayPerformance() {

    let attendancePercentage = 85;

    let marksPercentage = 86;

    let assignmentPercentage = 80;


    // --------------------------------------
    // ATTENDANCE
    // --------------------------------------

    const attendanceData =
        JSON.parse(
            localStorage.getItem(
                "campusSphereAttendance"
            )
        );


    if (
        attendanceData &&
        attendanceData.totalClasses &&
        attendanceData.attendedClasses
    ) {

        attendancePercentage =
            Math.round(
                (
                    attendanceData.attendedClasses /
                    attendanceData.totalClasses
                ) * 100
            );

    }



    // --------------------------------------
    // MARKS
    // --------------------------------------

    const marksData =
        JSON.parse(
            localStorage.getItem(
                "campusSphereMarks"
            )
        );


    if (
        Array.isArray(marksData) &&
        marksData.length > 0
    ) {

        let total = 0;

        let obtained = 0;


        marksData.forEach(
            function (mark) {

                total +=
                    Number(
                        mark.total || 100
                    );


                obtained +=
                    Number(
                        mark.obtained ||
                        mark.marks ||
                        0
                    );

            }
        );


        if (total > 0) {

            marksPercentage =
                Math.round(
                    (obtained / total) * 100
                );

        }

    }



    // --------------------------------------
    // ASSIGNMENTS
    // --------------------------------------

    const assignments =
        JSON.parse(
            localStorage.getItem(
                "campusSphereAssignments"
            )
        ) || [];


    if (assignments.length > 0) {

        assignmentPercentage = 80;

    }



    // --------------------------------------
    // OVERALL PERFORMANCE
    // --------------------------------------

    const overall =
        Math.round(
            (
                attendancePercentage +
                marksPercentage +
                assignmentPercentage
            ) / 3
        );



    // --------------------------------------
    // DISPLAY
    // --------------------------------------

    const attendanceElement =
        document.getElementById(
            "attendancePercentage"
        );

    const marksElement =
        document.getElementById(
            "marksPercentage"
        );

    const assignmentElement =
        document.getElementById(
            "assignmentPercentage"
        );

    const overallElement =
        document.getElementById(
            "overallPerformance"
        );

    const statusElement =
        document.getElementById(
            "performanceStatus"
        );


    if (attendanceElement) {

        attendanceElement.innerText =
            attendancePercentage + "%";

    }


    if (marksElement) {

        marksElement.innerText =
            marksPercentage + "%";

    }


    if (assignmentElement) {

        assignmentElement.innerText =
            assignmentPercentage + "%";

    }


    if (overallElement) {

        overallElement.innerText =
            overall + "%";

    }


    if (statusElement) {

        if (overall >= 75) {

            statusElement.innerText =
                "🎯 Good Academic Progress";

        }

        else if (overall >= 50) {

            statusElement.innerText =
                "📚 Needs Improvement";

        }

        else {

            statusElement.innerText =
                "⚠️ Requires Attention";

        }

    }

}



// ==========================================
// TEACHER NOTICE MANAGEMENT
// ==========================================

function publishNotice() {

    const title =
        document.getElementById(
            "noticeTitle"
        )?.value.trim();

    const category =
        document.getElementById(
            "noticeCategory"
        )?.value;

    const content =
        document.getElementById(
            "noticeContent"
        )?.value.trim();

    const date =
        document.getElementById(
            "noticeDate"
        )?.value;


    if (
        !title ||
        !category ||
        !content ||
        !date
    ) {

        alert(
            "Please fill all the notice details."
        );

        return;
    }


    const notice = {

        id: Date.now(),

        title: title,

        category: category,

        content: content,

        date: date,

        postedBy: "Teacher"

    };


    let notices =
        JSON.parse(
            localStorage.getItem(
                "campusSphereNotices"
            )
        ) || [];


    notices.push(notice);


    localStorage.setItem(
        "campusSphereNotices",
        JSON.stringify(notices)
    );


    document.getElementById(
        "noticeTitle"
    ).value = "";

    document.getElementById(
        "noticeCategory"
    ).value = "";

    document.getElementById(
        "noticeContent"
    ).value = "";

    document.getElementById(
        "noticeDate"
    ).value = "";


    alert(
        "✅ Notice published successfully!"
    );


    displayTeacherNotices();

}



// ==========================================
// DISPLAY TEACHER NOTICES
// ==========================================

function displayTeacherNotices() {

    const container =
        document.getElementById(
            "noticeContainer"
        );


    if (!container) {
        return;
    }


    const notices =
        JSON.parse(
            localStorage.getItem(
                "campusSphereNotices"
            )
        ) || [];


    if (notices.length === 0) {

        container.innerHTML =
            "<p>No notices published yet.</p>";

        return;
    }


    container.innerHTML = "";


    notices.forEach(
        function (notice) {

            const card =
                document.createElement("div");


            card.className =
                "notice-card";


            card.innerHTML = `

                <h3>
                    ${notice.title}
                </h3>

                <p>
                    <strong>Category:</strong>
                    ${notice.category}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${notice.date}
                </p>

                <p>
                    ${notice.content}
                </p>

                <button
                    type="button"
                    onclick="editNotice(${notice.id})">

                    ✏️ Edit

                </button>

                <button
                    type="button"
                    onclick="deleteNotice(${notice.id})">

                    🗑️ Delete

                </button>

            `;


            container.appendChild(card);

        }
    );

}



// ==========================================
// EDIT TEACHER NOTICE
// ==========================================

function editNotice(id) {

    let notices =
        JSON.parse(
            localStorage.getItem(
                "campusSphereNotices"
            )
        ) || [];


    const notice =
        notices.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!notice) {
        return;
    }


    const newTitle =
        prompt(
            "Edit notice title:",
            notice.title
        );


    if (newTitle === null) {
        return;
    }


    const newContent =
        prompt(
            "Edit notice details:",
            notice.content
        );


    if (newContent === null) {
        return;
    }


    notice.title =
        newTitle.trim() || notice.title;

    notice.content =
        newContent.trim() || notice.content;


    localStorage.setItem(
        "campusSphereNotices",
        JSON.stringify(notices)
    );


    displayTeacherNotices();


    alert(
        "Notice updated successfully!"
    );

}



// ==========================================
// DELETE TEACHER NOTICE
// ==========================================

function deleteNotice(id) {

    let notices =
        JSON.parse(
            localStorage.getItem(
                "campusSphereNotices"
            )
        ) || [];


    if (
        !confirm(
            "Are you sure you want to delete this notice?"
        )
    ) {

        return;
    }


    notices =
        notices.filter(
            function (notice) {

                return notice.id !== id;

            }
        );


    localStorage.setItem(
        "campusSphereNotices",
        JSON.stringify(notices)
    );


    displayTeacherNotices();


    alert(
        "Notice deleted successfully!"
    );

}



// ==========================================
// AI ASSISTANT
// ==========================================

function openAIAssistant() {

    window.location.href =
        "ai-assistant.html";

}



// ==========================================
// CERTIFICATE REQUEST COUNT
// ==========================================

function loadCertificateRequestCount() {

    const countElement =
        document.getElementById(
            "certificateRequestCount"
        );


    if (!countElement) {
        return;
    }


    const certificateRequests =
        JSON.parse(
            localStorage.getItem(
                "campusSphereCertificateRequests"
            )
        ) || [];


    countElement.innerText =
        certificateRequests.length +
        " Requests";

}



// ==========================================
// ADMIN NOTICE MANAGEMENT
// ==========================================

function displayAdminNotices() {

    const container =
        document.getElementById(
            "adminNoticeContainer"
        );


    const countElement =
        document.getElementById(
            "totalNoticeCount"
        );


    if (!container) {
        return;
    }


    const notices =
        JSON.parse(
            localStorage.getItem(
                "campusSphereNotices"
            )
        ) || [];


    if (countElement) {

        countElement.textContent =
            notices.length;

    }


    if (notices.length === 0) {

        container.innerHTML = `

            <p>
                📭 No notices available.
            </p>

        `;

        return;
    }


    container.innerHTML = "";


    notices.forEach(
        function (notice) {

            const card =
                document.createElement("div");


            card.className =
                "admin-notice-card";


            card.innerHTML = `

                <h3>
                    📢 ${notice.title}
                </h3>

                <p>
                    <strong>Category:</strong>
                    ${notice.category}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${notice.date}
                </p>

                <p>
                    ${notice.content}
                </p>

                <div class="notice-actions">

                    <button
                        type="button"
                        onclick="adminEditNotice(${notice.id})">

                        ✏️ Edit

                    </button>

                    <button
                        type="button"
                        onclick="adminDeleteNotice(${notice.id})">

                        🗑️ Delete

                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );

}



// ==========================================
// ADMIN EDIT NOTICE
// ==========================================

function adminEditNotice(id) {

    let notices =
        JSON.parse(
            localStorage.getItem(
                "campusSphereNotices"
            )
        ) || [];


    const notice =
        notices.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!notice) {
        return;
    }


    const newTitle =
        prompt(
            "Edit Notice Title:",
            notice.title
        );


    if (newTitle === null) {
        return;
    }


    const newContent =
        prompt(
            "Edit Notice Details:",
            notice.content
        );


    if (newContent === null) {
        return;
    }


    notice.title =
        newTitle.trim() || notice.title;

    notice.content =
        newContent.trim() || notice.content;


    localStorage.setItem(
        "campusSphereNotices",
        JSON.stringify(notices)
    );


    displayAdminNotices();


    alert(
        "Notice updated successfully!"
    );

}



// ==========================================
// ADMIN DELETE NOTICE
// ==========================================

function adminDeleteNotice(id) {

    let notices =
        JSON.parse(
            localStorage.getItem(
                "campusSphereNotices"
            )
        ) || [];


    if (
        !confirm(
            "Are you sure you want to delete this notice?"
        )
    ) {

        return;
    }


    notices =
        notices.filter(
            function (notice) {

                return notice.id !== id;

            }
        );


    localStorage.setItem(
        "campusSphereNotices",
        JSON.stringify(notices)
    );


    displayAdminNotices();


    alert(
        "Notice deleted successfully!"
    );

}



// ==========================================
// LOGOUT
// ==========================================

function logout() {

    window.location.href =
        "index.html";

}