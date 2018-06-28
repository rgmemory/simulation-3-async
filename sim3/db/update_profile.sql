update helousers
set first = $2, last = $3, gender = $4, hair = $5, eye = $6, hobby = $7, day = $8, month = $9, year = $10
where id = $1;

-- returning *;