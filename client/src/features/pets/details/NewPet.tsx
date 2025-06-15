import { Card } from "@mui/material";

export default function NewPet() {
    return (
        <>

            <Card sx={{ borderRadius: 3 }} className="mt-6 p-6">
                <h2 className="text-2xl md:text-3xl font-bold font-heading">Create Pet Profile</h2>
                <p className="text-sm text-gray-500 mt-1">Add details about your pet to receive personalised recipes</p>
            </Card></>
    )
}