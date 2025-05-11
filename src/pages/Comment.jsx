import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommentValidation } from '../utils/Yup';
import { useNavigate } from 'react-router-dom';

const createComment = (commentData) => {
  const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
  existingComments.push(commentData);
  localStorage.setItem('comments', JSON.stringify(existingComments));
  return commentData;
};

export default function Comment() {
  const [formdata, setFormData] = useState({
    bugId: '',
    to: '',
    content: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(CommentValidation)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData(prev => ({ ...prev, content: data }));
    setValue("content", data, { shouldValidate: true });
  };

  const OnSubmit = () => {
    try {
      createComment(formdata);
      setMessage('Comment Created!');
      setError(false);
      navigate('/dashboard');
    } catch (err) {
      console.error("Error creating comment", err);
      setMessage("Something went wrong");
      setError(true);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex bg-gray-100">
        <SideNav />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 w-full">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-2xl">
            <form onSubmit={handleSubmit(OnSubmit)} className="space-y-4">
              {error && <p className="text-red-500">{error}</p>}

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Bug</label>
                <select
                  name="bugId"
                  {...register("bugId")}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2">
                  <option value="">Select Bug</option>
                  <option value="bug1">Bug 1: Issue with login</option>
                  <option value="bug2">Bug 2: UI error</option>
                </select>
                {errors?.bugId && <p className="text-red-500 text-sm">{errors.bugId.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Assign To</label>
                <select
                  name="to"
                  {...register("to")}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2">
                  <option value="">Select User</option>
                  <option value="Sivaraman">Sivaraman</option>
                  <option value="Angelina">Angelina</option>
                  <option value="Amritha">Amritha</option>
                </select>
                {errors?.to && <p className="text-red-500 text-sm">{errors.to.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Comment</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={formdata.content}
                  onChange={handleEditorChange}
                />
                {errors?.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300"
                style={{ backgroundImage: 'linear-gradient(to right, #4f46e5, #3b82f6)' }}
              >
                Submit Comment
              </button>

              {message && <p className="text-green-600 mt-2">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
