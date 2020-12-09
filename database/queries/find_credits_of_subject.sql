CREATE OR REPLACE FUNCTION find_credits_of_subject (
    p_ders_kod course_sections.ders_kod%TYPE
) RETURN NUMBER IS
    v_credits NUMBER;
BEGIN
    SELECT MAX (credits)
    INTO v_credits
    FROM course_sections
    WHERE ders_kod = p_ders_kod;
    IF (v_credits IS NULL) THEN --some credits in records are null
        v_credits := 1; --that's why we make it 1
    END IF;
    RETURN v_credits;
END find_credits_of_subject;