create view person_owners_and_num_of_pets as
select person.*, count(pet.id) as num_of_pets
from person
inner join pet on pet.owner_id = person.id
group by person.id;