insert into helousers (auth_id, first, last, image)
values ($1, $2, $3, $4)
returning *;