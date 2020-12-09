CREATE OR REPLACE FUNCTION courses_rating (
    p_year   course_sections.year%TYPE,
    p_term   course_sections.term%TYPE
) RETURN pkgs.courses_rating_table
    PIPELINED
IS
    CURSOR c_ratings IS
    SELECT ders_kod,
           ROUND(AVG (qiymet_yuz), 4) AS rating
    FROM course_selections
    WHERE year = p_year
          AND term = p_term
    GROUP BY ders_kod
    ORDER BY rating DESC;
BEGIN
    FOR v_rec IN c_ratings LOOP
        PIPE ROW (v_rec);
    END LOOP;
END courses_rating;

SELECT * FROM TABLE (courses_rating (2018, 2));