import React, { useState } from 'react';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value
    };

    try {
      const response = await fetch('https://ssgform.com/s/4UAKkh6GcwCC', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setMessage('送信が完了しました。');
        event.target.reset();
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('送信に失敗しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white py-12 md:py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー：サイズを少し小さく、字間を広く */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-[0.1em] text-gray-900 noto-serif-jp-weight900">
            Contact Us
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-light tracking-wider">
            お問い合わせは、以下のフォームから送信してください。
          </p>
        </div>

        {/* フォーム：モバイル対応の余白調整 */}
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            
            {/* お名前 */}
            <div className="group border-b border-gray-200 focus-within:border-black transition-all duration-500">
              <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                Name / お名前
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="山田 太郎"
                className="w-full py-1 bg-transparent outline-none text-sm md:text-base font-light placeholder-gray-200"
              />
            </div>

            {/* メールアドレス */}
            <div className="group border-b border-gray-200 focus-within:border-black transition-all duration-500">
              <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                Email / メールアドレス
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="example@mail.com"
                className="w-full py-1 bg-transparent outline-none text-sm md:text-base font-light placeholder-gray-200"
              />
            </div>

            {/* メッセージ */}
            <div className="group border-b border-gray-200 focus-within:border-black transition-all duration-500">
              <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                Message / メッセージ
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows="3" 
                required 
                placeholder="ご質問やご依頼内容"
                className="w-full py-1 bg-transparent outline-none text-sm md:text-base font-light resize-none placeholder-gray-200"
              ></textarea>
            </div>
          </div>

          {/* ボタン：モバイルで押しやすく、かつ上品なサイズ */}
          <div className="text-center pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`
                min-w-[180px] px-8 py-3 bg-black text-white text-[11px] md:text-xs tracking-[0.3em] transition-all duration-300
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 active:scale-95'}
              `}
            >
              {isLoading ? 'SENDING...' : 'SEND / 送信する'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-8 text-center px-4 ${message.includes('失敗') ? 'text-red-500' : 'text-gray-400'}`}>
            <p className="text-[11px] tracking-widest leading-relaxed">{message}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;