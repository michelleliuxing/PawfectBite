import PetCard from "./PetCard";

type Props = {
    pets: Pet[]
}

export default function PetList({ pets }: Props) {
    return (
        <div className="flex flex-col gap-6 mx-auto max-w-6xl">
            {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
            ))}
        </div>
    )
}