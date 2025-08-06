function searchTeacher() {
  const query = document.getElementById('searchInput').value;
  if (query.trim() !== "") {
    alert(`Searching for: ${query}`);
  } else {
    alert("Please enter a search term.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('review-modal');
  const modalTeacherName = document.getElementById('modal-teacher-name');
  const reviewsList = document.getElementById('reviews-list');
  const closeBtn = modal.querySelector('.close');

  // Sample detailed reviews data
  const reviewsData = {
    "Mr. Kenneth Jones": {
      reviews: [
        {
          rating: 5,
          difficulty: 3.5,
          wouldTakeAgain: true,
          comment: "Amazing teacher! Makes complex concepts easy to understand."
        },
        {
          rating: 4.5,
          difficulty: 4.0,
          wouldTakeAgain: true,
          comment: "Very patient and explains concepts clearly."
        },
        {
          rating: 4.6,
          difficulty: 3.8,
          wouldTakeAgain: true,
          comment: "Great at breaking down difficult topics."
        }
      ]
    },
    "Mr. Charlie Paulson": {
      reviews: [
        {
          rating: 4,
          difficulty: 4.2,
          wouldTakeAgain: true,
          comment: "Challenging but fair. Really prepares you for the AP exam."
        },
        {
          rating: 4.4,
          difficulty: 4.0,
          wouldTakeAgain: false,
          comment: "Helpful during office hours."
        }
      ]
    },
    "Mrs. Sara Falls": {
      reviews: [
        {
          rating: 4.5,
          difficulty: 3.5,
          wouldTakeAgain: true,
          comment: "Passionate about literature and it shows. Great discussions."
        },
        {
          rating: 4.7,
          difficulty: 3.2,
          wouldTakeAgain: true,
          comment: "Encourages critical thinking."
        }
      ]
    }
  };

  function getStarIcons(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    let starsHtml = '';
    for(let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fa-solid fa-star text-gold"></i>';
    }
    if(halfStar) {
      starsHtml += '<i class="fa-solid fa-star-half-stroke text-gold"></i>';
    }
    const emptyStars = 5 - fullStars - halfStar;
    for(let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="fa-regular fa-star text-gold"></i>';
    }
    return starsHtml;
  }

  // Attach event listeners to View Reviews buttons
  document.querySelectorAll('.teacher-card button').forEach(button => {
    if(button.textContent.includes("View Reviews")) {
      button.addEventListener('click', () => {
        const teacherCard = button.closest('.teacher-card');
        const teacherName = teacherCard.querySelector('h3').textContent;
        modalTeacherName.textContent = teacherName;

        const data = reviewsData[teacherName];
        if (!data || data.reviews.length === 0) {
          reviewsList.innerHTML = '<p>No reviews available.</p>';
        } else {
          // Calculate averages
          const totalReviews = data.reviews.length;
          const avgRating = (data.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2);
          const avgDifficulty = (data.reviews.reduce((sum, r) => sum + r.difficulty, 0) / totalReviews).toFixed(2);
          const wouldTakeAgainPercent = Math.round((data.reviews.filter(r => r.wouldTakeAgain).length / totalReviews) * 100);

          // Show summary stats
          let html = `
            <div class="review-summary">
              <p><strong>Average Rating:</strong> ${getStarIcons(avgRating)} (${avgRating})</p>
              <p><strong>Average Difficulty:</strong> ${avgDifficulty}</p>
              <p><strong>Would Take Again:</strong> ${wouldTakeAgainPercent}%</p>
              <hr>
            </div>
          `;

          // Show each review detail
          html += data.reviews.map(r => `
            <div class="single-review">
              <p class="rating">${getStarIcons(r.rating)} (${r.rating})</p>
              <p><strong>Difficulty:</strong> ${r.difficulty}</p>
              <p><strong>Would Take Again:</strong> ${r.wouldTakeAgain ? 'Yes' : 'No'}</p>
              <blockquote>“${r.comment}”</blockquote>
              <hr>
            </div>
          `).join('');

          reviewsList.innerHTML = html;
        }

        // Show the modal with flex display for proper centering
        modal.style.display = 'flex';
      });
    }
  });

  // Close modal on X click
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside modal content
  window.addEventListener('click', e => {
    if(e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
