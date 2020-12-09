set serveroutput on;

CREATE OR REPLACE PACKAGE pkgs IS
    TYPE courses_popularity_rec IS RECORD (
        ders_kod    course_selections.ders_kod%TYPE,
        reg_count   NUMBER,
        diff        FLOAT
    );
    TYPE
    courses_popularity_table
    IS
        TABLE OF courses_popularity_rec;
    TYPE
    teachers_popularity_rec
    IS RECORD (
        ders_kod    course_selections.ders_kod%TYPE,
        emp_id      course_sections.emp_id%TYPE,
        reg_count   NUMBER,
        diff        FLOAT
    );
    TYPE teachers_popularity_table IS
        TABLE OF teachers_popularity_rec;
    TYPE gpa_rec IS RECORD (
        stud_id   course_selections.stud_id%TYPE,
        gpa       FLOAT,
        spa       FLOAT
    );
    TYPE
    gpa_table
    IS
        TABLE OF gpa_rec;
    TYPE 
    students_rec 
    IS RECORD (
        stud_id   course_selections.stud_id%TYPE
    );
    TYPE
    students_table
    IS
        TABLE OF students_rec;
    TYPE
    loading_rec
    IS RECORD (
        emp_id   course_sections.emp_id%TYPE,
        hours    NUMBER
    );
    TYPE 
    loading_table
    IS
        TABLE OF loading_rec;
    TYPE 
    retake_expenses_rec
    IS RECORD (
        stud_id       course_selections.stud_id%TYPE,
        term_spent    NUMBER,
        total_spent   NUMBER
    );
    TYPE
    retake_expenses_table
    IS
        TABLE OF retake_expenses_rec;
    TYPE
    teacher_schedule_rec 
    IS RECORD (
        emp_id       course_sections.emp_id%TYPE,
        ders_kod     course_selections.ders_kod%TYPE,
        section      course_sections.section%TYPE,
        day          VARCHAR2 (15),
        start_time   NUMBER
    );
    TYPE 
    teacher_schedule_table
    IS
        TABLE OF teacher_schedule_rec;
    TYPE
    student_schedule_rec 
    IS RECORD (
        stud_id      course_selections.stud_id%TYPE,
        ders_kod     course_selections.ders_kod%TYPE,
        section      course_sections.section%TYPE,
        day          VARCHAR2 (15),
        start_time   NUMBER
    );
    TYPE
    student_schedule_table
    IS
        TABLE OF student_schedule_rec;
    TYPE 
    selected_number_rec
    IS RECORD (
        stud_id          course_selections.stud_id%TYPE,
        subjects_count   NUMBER,
        credits_count    NUMBER
    );
    TYPE
    selected_number_table
    IS
        TABLE OF selected_number_rec;
    TYPE
    best_flow_rec
    IS RECORD (
        emp_id           course_sections.emp_id%TYPE,
        ders_kod         course_sections.ders_kod%TYPE,
        section          course_sections.section%TYPE,
        average_rating   FLOAT
    );
    TYPE 
    best_flow_table
    IS
        TABLE OF best_flow_rec;
    TYPE 
    teachers_rating_rec
    IS RECORD (
        emp_id           course_sections.emp_id%TYPE,
        average_rating   FLOAT
    );
    TYPE teachers_rating_table IS
        TABLE OF teachers_rating_rec;
    TYPE 
    courses_rating_rec
    IS RECORD (
        ders_kod         course_sections.ders_kod%TYPE,
        average_rating   FLOAT
    );
    TYPE courses_rating_table IS
        TABLE OF courses_rating_rec;
    TYPE profit_rec IS RECORD (
        retakes   NUMBER,
        profit    NUMBER
    );
    TYPE profit_table IS
        TABLE OF profit_rec;
END pkgs;