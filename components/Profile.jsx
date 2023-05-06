import PromptCard from "./PromptCard"
import Back from "./Back"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left flex items-center gap-4">
        <Back />
        <span className="blue_gradient leading-normal">{name}</span>
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
