import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/AIchat.css'
import {marked} from 'marked'

function AIchat(){

    async function sendMessage() {
        const input = document.getElementById('userInput').value;
        const responseDiv = document.getElementById('response');
        if (!input) {
            responseDiv.innerHTML = 'Please enter a message.';
            return;
        }
        responseDiv.innerHTML = 'Loading...';
        try {
            const response = await fetch(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer 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',
                        'HTTP-Referer': 'https://www.sitename.com',
                        'X-Title': 'SiteName',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'deepseek/deepseek-r1:free',
                        messages: [{ role: 'user', content: input}],
                    }),
                },
            );
            const data = await response.json();
            console.log(data);
            const markdownText =
              data.choices?.[0]?.message?.content || 'No response received.';
            responseDiv.innerHTML = marked.parse(markdownText);
          } catch (error) {
            responseDiv.innerHTML = 'Error: ' + error.message;
          }
        }
    return(
        <div className='background'>
            <div className='container'>
            <header>
                <nav>
                <NavLink to="/tasks" className={({isActive}) => isActive ? "tab active" : "tab"}>📋 Board view</NavLink>
                <NavLink to="/analytics"className={({isActive}) => isActive ? "tab active" : "tab"}>📊 Analytics</NavLink>
                <NavLink to="/AIchat" className={({isActive}) => isActive ? "tab active" : "tab"}>General AI</NavLink>
                <NavLink to="/AIassistant"className={({isActive}) => isActive ? "tab active" : "tab"}>Create AI Assistant</NavLink>
                </nav>
            </header>
            <div className="chat-container">
            <h2>AI CHAT</h2>
                <div className="form-group">
                    <input type="text" className="form-control" id="userInput" placeholder="Type your question here..." />
                </div>
                <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                <div id="response"></div>
            </div>
            </div>

        </div>
  


       )
}

export default AIchat