import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import FlashMessage from '@/Components/FlashMessage';
import { usePage } from '@inertiajs/react';

const Create = ({ departments }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        birth_date: '',
        hire_date: '',
        dept_no: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/employees', formData, {
            onError: (errorResponse) => setErrors(errorResponse),
            onSuccess: () => {
                setFormData({
                    first_name: '',
                    last_name: '',
                    gender: '',
                    birth_date: '',
                    hire_date: '',
                    dept_no: '',
                });
                setErrors({});
            },
        });
    };

    const handleReset = () => {
        setFormData({
            first_name: '',
            last_name: '',
            gender: '',
            birth_date: '',
            hire_date: '',
            dept_no: '',
        });
        setErrors({});
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <FlashMessage />
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Create Employee</h1>
                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">
                            First Name
                        </label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.first_name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-gray-700 font-medium mb-2">
                            Last Name
                        </label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.last_name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Gender</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    className="mr-2"
                                    checked={formData.gender === 'M'}
                                    onChange={handleChange}
                                    required
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    className="mr-2"
                                    checked={formData.gender === 'F'}
                                    onChange={handleChange}
                                    required
                                />
                                Female
                            </label>
                        </div>
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                        )}
                    </div>

                    {/* Birth Date */}
                    <div className="mb-4">
                        <label htmlFor="birth_date" className="block text-gray-700 font-medium mb-2">
                            Birth Date
                        </label>
                        <input
                            id="birth_date"
                            name="birth_date"
                            type="date"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.birth_date ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.birth_date}
                            onChange={handleChange}
                            required
                        />
                        {errors.birth_date && (
                            <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>
                        )}
                    </div>

                    {/* Hire Date */}
                    <div className="mb-4">
                        <label htmlFor="hire_date" className="block text-gray-700 font-medium mb-2">
                            Hire Date
                        </label>
                        <input
                            id="hire_date"
                            name="hire_date"
                            type="date"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.hire_date ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.hire_date}
                            onChange={handleChange}
                            required
                        />
                        {errors.hire_date && (
                            <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>
                        )}
                    </div>

                    {/* Department */}
                    <div className="mb-4">
                        <label htmlFor="dept_no" className="block text-gray-700 font-medium mb-2">
                            Department
                        </label>
                        <select
                            id="dept_no"
                            name="dept_no"
                            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dept_no ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.dept_no}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select a department
                            </option>
                            {departments.map((department) => (
                                <option key={department.dept_no} value={department.dept_no}>
                                    {department.dept_name}
                                </option>
                            ))}
                        </select>
                        {errors.dept_no && (
                            <p className="text-red-500 text-sm mt-1">{errors.dept_no}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 focus:outline-none"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
