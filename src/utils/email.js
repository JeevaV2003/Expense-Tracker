import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendExpenseNotification = async (expense, monthlyTotal) => {
  try {
    const templateParams = {
      to_email: 'jeevaravan08@gmail.com',
      expense_title: expense.title,
      expense_amount: expense.amount,
      expense_category: expense.category,
      expense_date: new Date(expense.date).toLocaleDateString(),
      monthly_total: monthlyTotal.toFixed(2),
    };

    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', result);
    return { success: true, message: 'Email notification sent successfully!' };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, message: 'Failed to send email notification. Please check your EmailJS configuration.' };
  }
};
