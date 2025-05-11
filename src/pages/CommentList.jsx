import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';

export default function CommentList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex bg-gray-100">
        <SideNav />
        <div className="flex-1 p-4 sm:p-8">
          <h2 className="text-xl font-semibold">Posted Comments</h2>
          <div className="space-y-4 mt-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <div><strong>Bug ID:</strong> {comment.bugId}</div>
                  <div><strong>Assigned To:</strong> {comment.to}</div>
                  <div><strong>Comment:</strong>
                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: comment.content }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
