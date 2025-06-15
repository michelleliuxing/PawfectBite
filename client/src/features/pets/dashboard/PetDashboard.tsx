import { Link } from "@mui/material";
import PetList from "./PetList";
import NewPet from "../details/NewPet";

type Props = {
    pets: Pet[];
}

export default function PetDashboard({ pets }: Props) {
    return (
        <section className="py-8 bg-[#f4f1de]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold font-heading">My Pet Profiles</h2>
                    <Link href="/pets/new" underline="none">
                        <div className="flex mt-4 md:mt-0 py-2 px-3 bg-[#ef6c00] hover:bg-[#e65100] text-white rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add New Pet
                        </div>
                    </Link>
                </div>

                <PetList pets={pets}></PetList>
                <NewPet></NewPet>
            </div>

        </section>
    )
}
