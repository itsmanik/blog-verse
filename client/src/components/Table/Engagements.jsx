const Engagements = () => {
    const blogs = [
        { title: 'How to Build Scalable Web Applications Using Django and React', views: 120, likes: 45 },
        { title: 'Understanding the Basics of Machine Learning', views: 250, likes: 90 },
        { title: 'Top 10 Tips for Web Development in 2024', views: 400, likes: 150 },
        { title: 'Top 10 Tips for Web Development in 2024', views: 400, likes: 150 },
        { title: 'Top 10 Tips for Web Development in 2024', views: 400, likes: 150 },
        { title: 'Top 10 Tips for Web Development in 2024', views: 400, likes: 150 },
        { title: 'Top 10 Tips for Web Development in 2024', views: 400, likes: 150 },
      ];
  return (
    <div>
      <div className="overflow-x-auto mx-12">
        <table className="w-full border table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Blog Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Views
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Likes
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
              {blogs.map((blog, index) => (
            <tr key={index} className="border-b hover:bg-primaryColor">
              <td className="px-4 py-2 text-sm">
                {blog.title.length > 50 ? `${blog.title.slice(0, 50)}...` : blog.title}
              </td>
              <td className="px-4 py-2 text-sm">{blog.views}</td>
              <td className="px-4 py-2 text-sm">{blog.likes}</td>
              <td className="px-4 py-2 text-sm">{blog.likes}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Engagements;
