'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard 
          key={prompt._id} 
          post={prompt}  
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // do debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  }

  const fetchPosts = async () => {
    const res = await fetch('/api/prompt')
    const data = await res.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleTagClick = (tag) => {
    setSearchText(tag)

    const searchResult = filterPosts(tag);
    setSearchResults(searchResult);
  }

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    // check if searchText starts with a '#'
    if (searchtext[0] === '#') {
      return posts.filter((post) => regex.test(post.tag));
    } 

    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>


      <PromptCardList 
        data={searchText ? searchResults : posts}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed
