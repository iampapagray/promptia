import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
      </h1>

      <p className="desc text-left">
       {desc}
      </p>

      <div className='mt-10 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard 
          key={prompt._id} 
          post={prompt}  
          handleEdit={() => handleEdit && handleEdit(prompt)}
          handleDelete={() => handleDelete && handleDelete(prompt)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile