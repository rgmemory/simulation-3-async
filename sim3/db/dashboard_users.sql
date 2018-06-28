select * from helousers 
where id not in
(select friend_id from helojunction where user_id = $1) 
and id != $1;