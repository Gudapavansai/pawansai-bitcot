import { useEffect, useState } from "react";
import add from "../assets/plus.svg";

const EditContact = ({ list, index, setList, showModal, setModal }) => {
    const [data, setData] = useState({});

    // Load the contact data when the component mounts or when `index` changes
    useEffect(() => {
        // Assume `index` corresponds to the ID of the contact to be edited
        // Replace this with your actual method of retrieving contact data
        setData(list.find(i => i.id == index));
        const fetchData = async () => {
            // Fetch the contact data from your source
            const response = await fetch("https://your-api-url.com/contacts");
            const contacts = await response.json();
            const contactToEdit = contacts.find(contact => contact.id === index);
            setData(contactToEdit || {});
        };

        if (showModal) {
            fetchData();
        }
    }, [index, showModal]);

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setList((list) => list.map(contact =>
            contact.id === index ? { ...data, id: index } : contact
        ));
        setModal(false);
    };

    return (
        <div className={`absolute top-[25%] left-0 editContact-modal container w-full min-h-[50vh] bg-white shadow-xl rounded-md border-2 p-4 z-50`}>
            <h2 className="text-3xl font-semibold text-slate-700 px-6 flex w-full justify-between">
                Edit Contact
                <button className="px-2 py-2 bg-slate-700" onClick={(e) => { e.preventDefault(); setModal(false); }}>
                    <img src={add} alt="Close modal" className="rotate-45 invert" />
                </button>
            </h2>
            <form className="w-full h-full flex flex-col justify-start px-4 py-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={data.name || ''}
                    placeholder="Name"
                    className="px-4 py-2 border-2 my-2"
                    onChange={(e) => handleInputChange(e, "name")}
                />
                <input
                    type="text"
                    name="email"
                    value={data.email || ''}
                    placeholder="Email"
                    className="px-4 py-2 border-2 my-2"
                    onChange={(e) => handleInputChange(e, "email")}
                />
                <input
                    type="text"
                    name="phone"
                    value={data.mobile || ''}
                    placeholder="Phone"
                    className="px-4 py-2 border-2 my-2"
                    onChange={(e) => handleInputChange(e, "mobile")}
                />
                <input
                    type="text"
                    name="address"
                    value={data.address || ''}
                    placeholder="Address"
                    className="px-4 py-2 border-2 my-2"
                    onChange={(e) => handleInputChange(e, "address")}
                />
                <div className="flex space-x-2 mt-4 font-bold">
                    <button
                        type="button"
                        className="text-slate-700 border-2 border-slate-700 w-full py-2 px-6 hover:cursor-pointer"
                        onClick={() => setData({})} // Clear the form data on reset
                    >
                        Reset
                    </button>
                    <input
                        type="submit"
                        value="Update"
                        className="bg-slate-700 text-white w-full py-2 px-6 hover:cursor-pointer"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditContact;
