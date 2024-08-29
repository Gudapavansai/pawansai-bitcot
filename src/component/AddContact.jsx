import { useEffect } from "react";
import add from "../assets/plus.svg";

const AddContact = ({ data, setData, setList, showModal, setModal }) => {

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleInputChange = (e, key) => {
        const { value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit-data: ', data);
        setList((list) => {
            const id = list.length + 1; // Adjust ID generation as needed
            return [...list, { ...data, id }];
        });
        setData({}); // Clear form data after submission
        setModal(false);
    };

    return (
        <div className={`absolute top-[25%] left-0 addContact-modal container w-full min-h-[50vh] bg-white shadow-xl rounded-md border-2 p-4 z-50`}>
            <h2 className="text-3xl font-semibold text-slate-700 px-6 flex w-full justify-between">
                Create Contact
                <button className="px-2 py-2 bg-slate-700" onClick={(e) => { e.preventDefault(); setModal(false); }}>
                    <img src={add} alt="Close modal" className="rotate-45 invert" />
                </button>
            </h2>
            <form className="w-full h-full flex flex-col justify-start px-4 py-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="px-4 py-2 border-2 my-2"
                    value={data.name || ''}
                    onChange={(e) => handleInputChange(e, "name")}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="px-4 py-2 border-2 my-2"
                    value={data.email || ''}
                    onChange={(e) => handleInputChange(e, "email")}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="px-4 py-2 border-2 my-2"
                    value={data.mobile || ''}
                    onChange={(e) => handleInputChange(e, "mobile")}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="px-4 py-2 border-2 my-2"
                    value={data.address || ''}
                    onChange={(e) => handleInputChange(e, "address")}
                />
                <div className="flex space-x-2 mt-4 font-bold">
                    <button
                        type="reset"
                        className="text-slate-700 border-2 border-slate-700 w-full py-2 px-6 hover:cursor-pointer"
                        onClick={() => setData({})} // Clear the form data on reset
                    >
                        Reset
                    </button>
                    <input
                        type="submit"
                        value="Submit"
                        className="bg-slate-700 text-white w-full py-2 px-6 hover:cursor-pointer"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddContact;
