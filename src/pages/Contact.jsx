import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    const name = event.target.name.value;
    const email = event.target.email.value;
    const content = event.target.message.value;

    // Discordへ送るメッセージの整形
    const discordPayload = {
      embeds: [
        {
          title: "📌 お問い合わせ通知",
          color: 0x333333, // グレー系の色
          fields: [
            { name: "お名前", value: name, inline: true },
            { name: "メールアドレス", value: email, inline: true },
            { name: "メッセージ", value: content }
          ],
          timestamp: new Date().toISOString(),
        }
      ]
    };

    try {
      const response = await fetch('https://discord.com/api/webhooks/1457835944580354118/dS89uWObB5SqR4_tYn1OUx8xSyk5b5Si2IDNm4iB_-YKFzZ-3Pi1te0iXAlbKE3B4jQZ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload)
      });
      
      if (response.ok) {
        setMessage('送信が完了しました。');
        event.target.reset();
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container noto-serif-jp-weight200">
      <h2 className='noto-serif-jp-weight900'>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group noto-serif-jp-weight200">
          <label htmlFor="name">お名前</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group noto-serif-jp-weight200">
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group noto-serif-jp-weight200">
          <label htmlFor="message">メッセージ</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? '送信中...' : '送信'}
        </button>
      </form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default Contact;