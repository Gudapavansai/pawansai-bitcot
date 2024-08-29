import React, { useEffect } from "react";
import closeIcon from "../assets/plus.svg"; // Ensure you have a proper close icon

const ViewContact = ({ contact, showModal, setModal }) => {

    useEffect(() => {
        if (contact) {
            console.log('Viewing Contact: ', contact);
        }
    }, [contact]);

    if (!contact) return null; // Return nothing if no contact is provided

    return (
        <div className={`absolute top-[25%] left-0 viewContact-modal container w-full min-h-[50vh] bg-white shadow-xl rounded-md border-2 p-4 z-50`}>
            <h2 className="text-3xl font-semibold text-slate-700 px-6 flex w-full justify-between items-center">
                View Contact
                <button className="px-2 py-2 bg-slate-700" onClick={(e) => { e.preventDefault(); setModal(false); }} aria-label="Close">
                    <img src={closeIcon} alt="Close" className="w-6 h-6" />
                </button>
            </h2>
            <div className="w-full h-full flex flex-col justify-start px-4 py-4">
                <div className="my-2">
                    <label className="font-semibold">Name: </label>
                    <span className="ml-2">{contact.name}</span>
                </div>
                <div className="my-2">
                    <label className="font-semibold">Email: </label>
                    <span className="ml-2">{contact.email}</span>
                </div>
                <div className="my-2">
                    <label className="font-semibold">Phone: </label>
                    <span className="ml-2">{contact.mobile}</span> {/* Ensure 'mobile' is correct */}
                </div>
                <div className="my-2">
                    <label className="font-semibold">Address: </label>
                    <span className="ml-2">{contact.address || 'N/A'}</span> {/* Default to 'N/A' if no address */}
                </div>
            </div>
        </div>
    );
};

export default ViewContact;
