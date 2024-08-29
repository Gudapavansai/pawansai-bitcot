import { useEffect, useState } from 'react';
import img from "./assets/plus.svg";
import profile from "./assets/profile.svg";
import eye from "./assets/eye.svg";
import edit from "./assets/edit.svg";
import deleteIcon from "./assets/delete.svg";
import AddContact from './component/AddContact';
import EditContact from './component/EditContact';
import ViewContact from './component/ViewContact';

function App() {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [listShow, setListShow] = useState([]);
  const [showModal, setModal] = useState(false);
  const [showEdit, setEdit] = useState(false);
  const [showView, setView] = useState(false);
  const [showContact, setConctact] = useState({});
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json");
        const listData = await response.json();
        const initialList = listData;
        console.log('initialList: ', initialList);
        setList(initialList);
        setListShow(initialList);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setListShow(list); // Update the listShow whenever list changes
  }, [list]);

  const funsearchListShow = (event) => {
    const search = event.target.value.toLowerCase();
    const newList = list.filter(item => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.mobile.includes(search) ||
        item.email.toLowerCase().includes(search)
      );
    });
    setListShow(newList);
  };

  return (
    <section className='relative home-container w-screen h-screen max-w-[80vh] mx-auto'>
      {showModal && <AddContact data={data} setData={setData} setList={setList} showModal={showModal} setModal={setModal} />}
      {showEdit && <EditContact list={list} index={editId} setList={setList} setModal={setEdit} showModal={showEdit} />}
      {showView && <ViewContact contact={showContact} showModal={showView} setModal={setView} />}
      <h1 className='text-center text-5xl font-bold text-slate-500 py-8'>Contact App</h1>
      <div className="contacts-page w-full h-full">
        <div className='contacts-cta flex justify-start gap-2 my-4'>
          <input
            type="text"
            className='w-full py-2 px-2 border-4 border-opacity-60'
            placeholder='Search Contact'
            onChange={funsearchListShow}
          />
          <button className='buttons bg-slate-700 w-full py-2 px-8 flex justify-center' onClick={(e) => { e.preventDefault(); setModal(true); }} >
            <img src={img} alt="" className='invert' />
          </button>
        </div>
        <div className='w-full h-full'>
          <div className="contact-list w-full h-full flex flex-col justify-start">
            {
              listShow.map((contact, id) => (
                <div key={contact.id} className={`contact-card w-full h-fit px-4 py-4 text-lg flex justify-start items-center gap-2 ${id % 2 === 0 ? "bg-gray-200" : "bg-gray-400 text-white"}`}>
                  <span className='seq-number mx-[1.5rem] w-[2rem]'>{id + 1}</span>
                  <div className="contact-detail flex gap-4 w-[50vw] mx-auto">
                    <img src={profile} alt="" className={`${id % 2 === 0 ? "invert-none" : "invert"}`} />
                    <div className='flex flex-col space-2 justify-start'>
                      <span className='contact-name'>{contact.name}</span>
                      <span className=''>{contact.mobile}</span>
                    </div>
                    <div className="actions-wrapper w-[10rem] justify-evenly flex items-center ml-auto">
                      <img src={eye} alt="" className={`h-8 ${id % 2 === 0 ? "invert-none" : "invert"} hover:cursor-pointer`}
                        onClick={() => {
                          setView(true);
                          setConctact(contact);
                        }} />
                      <img src={edit} alt="" className={`h-8 ${id % 2 === 0 ? "invert-none" : "invert"} hover:cursor-pointer`} onClick={() => { setEdit(true); setEditId(contact.id); }} />
                      <img src={deleteIcon} alt="" className={`h-8 ${id % 2 === 0 ? "invert-none" : "invert"} hover:cursor-pointer`}
                        onClick={() => {
                          setList(prevList => prevList.filter(listItem => listItem.id !== contact.id));
                        }} />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
