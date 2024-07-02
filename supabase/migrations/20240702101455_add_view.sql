create view person_owners as
select person.*
from person
where exists (
    select 1
    from pet
    where pet.owner_id = person.id
);
