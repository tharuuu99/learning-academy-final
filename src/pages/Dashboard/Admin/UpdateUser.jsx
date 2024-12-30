import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../hooks/useAuth';

const UpdateUser = () => {
    const { user } = useAuth();
    const userCredentials = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData);

        axiosSecure.put(`/update-userbyAdmin/${userCredentials?._id}`, updatedData).then(res => {
            if(res.data.modifiedCount > 0){
                alert("User updated successfully");
                navigate('/dashboard/manage-users');
            }
            console.log(res.data)
        }).catch(err => console.log(err))
       
    };



    return (
        <div>
            <h1 className='mt-5 text-4xl font-bold text-center'>Update  : <span className='text-secondary'>{user?.displayName}</span></h1>
            <p className='text-center'>Change details about <span className='font-bold text-red-400'>{userCredentials?.name}</span></p>
            {/* Form area starts here */}
            <section className="">
                <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8">
                    <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12">
                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="pb-4 ml-2" htmlFor="name">Name</label>
                                    <input
                                        className="w-full p-3 mt-3 text-sm border rounded-lg outline-none border-secondary"
                                        placeholder="Your Name"
                                        type="text"
                                        required
                                        defaultValue={userCredentials?.name ? userCredentials?.name : ''}
                                        id="name"
                                        name='name'
                                    />
                                </div>
                                <div>
                                    <label className="ml-2" htmlFor="phone">Phone</label>
                                    <input
                                        className="w-full p-3 mt-3 text-sm border rounded-lg outline-none border-secondary"
                                        placeholder="Phone Number"
                                        required
                                        type="tel"
                                        id="phone"
                                        defaultValue={userCredentials?.phone ? userCredentials?.phone : ''}
                                        name='phone'
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="ml-2" htmlFor="students">Email</label>
                                    <p className='text-[12px] ml-2 text-red-400'>Update email is not recommended. Please leave it default</p>
                                    <input
                                        className="w-full p-3 mt-2 text-sm border rounded-lg outline-none border-secondary"
                                        placeholder="Email address"
                                        type="email"
                                        required
                                        defaultValue={userCredentials?.email}
                                        name="email"
                                        id="email"
                                    />
                                </div>
                                <div>
                                    <label className="ml-2" htmlFor="phone">Skills</label>
                                    <p className='text-[12px] ml-2 text-red-400'>If the user is an instructor, then set skills; otherwise, leave it empty</p>
                                    <input
                                        className="w-full p-3 mt-2 text-sm border rounded-lg outline-none border-secondary"
                                        placeholder="Skills"
                                        defaultValue={userCredentials?.skills ? userCredentials?.skills : ''}
                                        type="text"
                                        name="skills"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="ml-2" htmlFor="address">Address</label>
                                    <input
                                        className="w-full p-3 mt-2 text-sm border rounded-lg outline-none border-secondary"
                                        placeholder="Address"
                                        required
                                        defaultValue={userCredentials?.address}
                                        name='address'
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="ml-2" htmlFor="photoUrl">Photo URL</label>
                                    <input
                                        className="w-full p-3 mt-2 text-sm border rounded-lg outline-none border-secondary"
                                        placeholder="Photo URL"
                                        name='photoUrl'
                                        required
                                        defaultValue={userCredentials?.photoUrl}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <h1>Please select a role</h1>
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                <div>
                                    <input
                                        className="sr-only peer"
                                        id="option1"
                                        type="radio"
                                        value='user'
                                        defaultChecked={userCredentials?.role === 'user' ? true : false}
                                        tabIndex="-1"
                                        name="option"
                                    />
                                    <label
                                        htmlFor="option1"
                                        className="block w-full p-3 border rounded-lg border-secondary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
                                        tabIndex="0"
                                    >
                                        <span className="text-sm font-medium">User</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        className="sr-only peer"
                                        id="option2"
                                        type="radio"
                                        value='admin'
                                        defaultChecked={userCredentials?.role === 'admin' ? true : false}
                                        tabIndex="-1"
                                        name="option"
                                    />
                                    <label
                                        htmlFor="option2"
                                        className="block w-full p-3 border rounded-lg border-secondary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
                                        tabIndex="0"
                                    >
                                        <span className="text-sm font-medium">Admin</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        className="sr-only peer"
                                        id="option3"
                                        value='instructor'
                                        type="radio"
                                        defaultChecked={userCredentials?.role === 'instructor' ? true : false}
                                        tabIndex="-1"
                                        name="option"
                                    />
                                    <label
                                        htmlFor="option3"
                                        className="block w-full p-3 border rounded-lg border-secondary peer-checked:bg-secondary peer-checked:text-white"
                                        tabIndex="0"
                                    >
                                        <span className="text-sm font-medium">Instructor</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="message">About</label>
                                <textarea
                                    className="w-full p-3 text-sm border rounded-lg outline-none resize-none border-secondary"
                                    placeholder="About user"
                                    rows="4"
                                    defaultValue={userCredentials?.about ? userCredentials?.about : ''}
                                    name='about'
                                    id="message"
                                ></textarea>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full px-5 py-3 font-medium text-white rounded-lg bg-secondary sm:w-auto"
                                >
                                    Update user
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateUser;
