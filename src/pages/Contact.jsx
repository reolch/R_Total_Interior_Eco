import React, { useState } from 'react';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value
    };

    try {
      // Discord Webhookに送信
      const discordPayload = {
        content: '🔔 **新しいお問い合わせがあります**',
        embeds: [
          {
            title: 'お問い合わせ内容',
            color: 3447003, // 青色
            fields: [
              {
                name: '👤 お名前',
                value: formData.name || '未入力',
                inline: true
              },
              {
                name: '📧 メールアドレス',
                value: formData.email || '未入力',
                inline: true
              },
              {
                name: '💬 メッセージ',
                value: formData.message || '未入力',
                inline: false
              }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      const response = await fetch('https://discord.com/api/webhooks/1457835944580354118/dS89uWObB5SqR4_tYn1OUx8xSyk5b5Si2IDNm4iB_-YKFzZ-3Pi1te0iXAlbKE3B4jQZ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload)
      });
      
      if (response.ok) {
        setMessage('送信が完了しました。ありがとうございます。');
        setMessageType('success');
        // フォームをリセット
        event.target.reset();
      } else {
        const errorText = await response.text();
        console.error('Discord API Error:', errorText);
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('送信に失敗しました。しばらく時間をおいて再度お試しください。');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-noto-serif">
            お問い合わせ
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-noto-serif">
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
            <br className="hidden sm:block" />
            お返事には数日かかる場合がございますので、あらかじめご了承ください。
          </p>
        </div>

        {/* フォームカード */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* お名前 */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-semibold text-gray-700 mb-2 font-noto-serif"
              >
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 outline-none font-noto-serif text-gray-900 placeholder-gray-400"
                placeholder="山田 太郎"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-gray-700 mb-2 font-noto-serif"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 outline-none font-noto-serif text-gray-900 placeholder-gray-400"
                placeholder="example@email.com"
              />
            </div>

            {/* メッセージ */}
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-semibold text-gray-700 mb-2 font-noto-serif"
              >
                メッセージ <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 outline-none resize-y font-noto-serif text-gray-900 placeholder-gray-400"
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>

            {/* 送信ボタン */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-noto-serif ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </span>
                ) : (
                  '送信する'
                )}
              </button>
            </div>
          </form>

          {/* メッセージ表示 */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg transition-all duration-300 ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-start">
                {messageType === 'success' ? (
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <p className="font-noto-serif">{message}</p>
              </div>
            </div>
          )}
        </div>

        {/* 追加情報 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 font-noto-serif">
            お急ぎの場合は、お電話でのお問い合わせも承っております。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
