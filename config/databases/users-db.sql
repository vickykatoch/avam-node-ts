INSERT INTO users(id,firstName,lastName,isActive)
values("F456234","Mamta","Katoch",1),
("D123234","Balwinder","Katoch",1),
("G875234","Aryan","Katoch",1),
("S987234","Aadi","Katoch",1);

insert into roles(name,description,isActive,isAdmin)
values("Administrator", "System Administrator", 1,1),
("Normal User", "Normal User",1,1),
("Guest", "Guest",1,1);

insert into resources(name,identifier,type,isActive,xclusiveAccess)
values("home","/home","PATH",1,0),("users","/users","PATH",1,0),("roles","/roles","PATH",1,0);

insert into role_resources(role, resource,permissions)
values(1,1,-1),(1,2,-1),(1,3,-1),(2,1,-1);

insert into user_roles(user,role)
values("D123234",1),("F456234",2),("G875234",2),("S987234",2);