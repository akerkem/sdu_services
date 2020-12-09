CREATE OR REPLACE FUNCTION to_gpa (
    score course_selections.qiymet_yuz%TYPE
) RETURN FLOAT IS
    v_grade FLOAT;
BEGIN
    IF score >= 95 THEN
        v_grade := 4;
    ELSIF score >= 90 THEN
        v_grade := 3.67;
    ELSIF score >= 85 THEN
        v_grade := 3.33;
    ELSIF score >= 80 THEN
        v_grade := 3.0;
    ELSIF score >= 75 THEN
        v_grade := 2.67;
    ELSIF score >= 70 THEN
        v_grade := 2.33;
    ELSIF score >= 65 THEN
        v_grade := 2.0;
    ELSIF score >= 60 THEN
        v_grade := 1.67;
    ELSIF score >= 55 THEN
        v_grade := 1.33;
    ELSIF score >= 50 THEN
        v_grade := 1.0;
    ELSE
        v_grade := 0;
    END IF;
    RETURN v_grade;
END to_gpa;
