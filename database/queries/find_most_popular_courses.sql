set serveroutput on;

CREATE OR REPLACE FUNCTION find_most_popular_courses (
    p_year   course_selections.year%TYPE,
    p_term   course_selections.term%TYPE
) RETURN pkgs.courses_popularity_table
    PIPELINED
IS

    CURSOR c_courses IS
    SELECT DISTINCT ders_kod,
           COUNT (*) AS reg_count,
           -- popularity depends on order of registration dates
           -- so courses picked faster than other ones should be higher
           -- if the course has less quotas, we divide difference between earliest
           -- and latest on amount of registered records
           ROUND(((MAX (reg_date) - MIN (reg_date)) / COUNT (*))* 100, 2) AS diff
    FROM course_selections
    WHERE year = p_year
          AND term = p_term
    GROUP BY ders_kod, year, term
    HAVING ((MAX (reg_date) - MIN (reg_date)) / COUNT (*) != 0 
            OR MAX (reg_date) IS NULL)
           AND COUNT (*) > 30
    ORDER BY diff,
             reg_count DESC;

--populate table
BEGIN
    FOR v_rec IN c_courses LOOP
        PIPE ROW (v_rec);
    END LOOP;
END find_most_popular_courses;

select * from table (find_most_popular_courses (2019, 1) );

--DD-MON-RR HH12:MI:SS PM