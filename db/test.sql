use dog_db;
-- SELECT 
-- *,
-- (SELECT count(1)+1 FROM dogs as b where a.id=b.id and a.rating < b.rating) as rank 
-- from dogs as a;

select *, RANK() OVER (ORDER BY rating DESC) dog_rank from dogs;

select * from 
    (
    select *, 
    RANK() OVER (ORDER BY rating DESC) dog_rank 
    from dogs) 
    as dog_ranking WHERE id = 9;