import React from 'react'

const FileView = ({data}) => {
    return (
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
          <img
            src="https://img.freepik.com/free-vector/illustration-document-icon_53876-28510.jpg?size=626&ext=jpg"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <a
                href='#'
                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                aria-label="Category"
                title="traveling"
              >
                Uploaded on
              </a>
              <span className="text-gray-600">— {data.date}</span>
            </p>
            <a
              href={data.url}
              aria-label="Category"
              title="Simple is better"
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-yellow-700 text-yellow-900"
            >
              {data.title}
            </a>
            <p className="mb-2 text-gray-700">
              {data.desc}
            </p>
            <a
              href={data.url}
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Open
            </a>
          </div>
        </div>
    )
}

export default FileView
