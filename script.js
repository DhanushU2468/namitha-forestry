
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.backgroundColor = '#f0f8ff';
        card.style.cursor = 'pointer';
    });
    card.addEventListener('mouseout', () => {
        card.style.backgroundColor = 'white';
    });
});

const header = document.querySelector('header h1');
const originalText = header.textContent;

setInterval(() => {
    header.textContent = "Explore Nature's Best";
    setTimeout(() => {
        header.textContent = originalText;
    }, 3000);
}, 6000);
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
//document.addEventListener("DOMContentLoaded", function () {
   // var swiper = new Swiper(".swiper-container", {
     //   slidesPerView: 1,
     //   spaceBetween: 10,
      //  loop: true,
      //  autoplay: {
      //      delay: 2500,
        //    disableOnInteraction: false,
       // },
       // pagination: {
       //     el: ".swiper-pagination",
       //     clickable: true,
        //},
        //navigation: {
         //   nextEl: ".swiper-button-next",
        //    prevEl: ".swiper-button-prev",
       // },
   //     breakpoints: {
    //        640: {
   //             slidesPerView: 2,
   //         },
   //         1024: {
   //             slidesPerView: 3,
   //         },
  //      }
//    });
//});
// Plant Data with AI-generated information
const plants = [
    { 
        name: "Sandalwood", 
        price: "Rs. 50", 
        image: "sandal.png", 
        info: "Sandalwood is highly valued for its fragrant wood and is used in perfumes, cosmetics, and traditional medicine. It has antiseptic and anti-inflammatory properties."
    },
    { 
        name: "Mahogany", 
        price: "Rs. 40", 
        image: "mahogany.webp", 
        info: "Mahogany is a durable and reddish-brown hardwood widely used in furniture and construction. It is also known for its termite resistance."
    },
    { 
        name: "Teak Wood", 
        price: "Rs. 35", 
        image: "teak.png", 
        info: "Teak wood is popular for outdoor furniture due to its weather resistance. It is also used in shipbuilding and flooring."
    },
    { 
        name: "Red Sandalwood", 
        price: "Rs. 60", 
        image: "redsandal.png", 
        info: "Red Sandalwood is used in traditional medicine and cosmetics. It is known for its skin-healing and anti-aging properties."
    },
    { 
        name: "Silver Oak", 
        price: "Rs. 35", 
        image: "silveroak.png", 
        info: "Silver Oak is used for shade and as a timber tree. It is commonly planted along roadsides and in agroforestry."
    },
    { 
        name: "Rosewood", 
        price: "Rs. 40", 
        image: "rosewood.png", 
        info: "Rosewood is known for its rich color and durability, often used in making musical instruments and luxury furniture."
    },
    { 
        name: "Dalbergia Sisso", 
        price: "Rs. 40", 
        image: "dalber.png", 
        info: "Also known as Indian Rosewood, it is used in furniture and for reforestation projects due to its fast growth."
    },
    { 
        name: "Tabebuia Rosea", 
        price: "Rs. 50", 
        image: "tabebuia.png", 
        info: "Tabebuia rosea, commonly known as the Rosy Trumpet Tree, Pink Poui, or Pink Trumpet Tree, is a flowering tree native to tropical regions of the Americas. It is cherished worldwide for its vibrant pink blossoms that appear in profusion, creating a spectacular display in gardens, parks, and along city streets"
    },
    { 
        name: "tabebuia Avalanadae", 
        price: "Rs. 60", 
        image: "avalanadae.png", 
        info: "Tabebuia avalanadae—a striking species in the Tabebuia genus known for its ornamental beauty and vibrant blossoms. You can adjust or expand on these details depending on the specific traits and regional information available for this species."
    },
    { 
        name: "Gulmohar", 
        price: "Rs. 40", 
        image: "gulmohar.png", 
        info: "Gulmohar (Delonix regia)– one of the most well-known ornamental trees in tropical regions."
    },
    { 
        name: "Jacaranda", 
        price: "Rs. 60", 
        image: "jacaranda.png", 
        info: "Jacarandas are tropical and subtropical trees native to South America. Today, they grace streets, parks, and gardens around the world, prized for their striking visual appeal during bloom."
    },
    { 
        name: "Mango", 
        price: "Rs. 240", 
        image: "mango.png", 
        info: "Mangoes are usually grown from a healthy 2 to 4 foot tall (.6 to 1.2 m) nursery tree. Buy a tree that has no sign of wounds or other damage to the trunk."
    },
    { 
        name: "Water Apple", 
        price: "Rs. 110", 
        image: "waterapple.png", 
        info: "Bearing the scientific name Syzygium aqueum and locally called “Pani Seb” or “Chambakka” in Hindi, water apples are more than just a luscious summer bounty."
    },
    { 
        name: "Jamun", 
        price: "Rs. 140", 
        image: "jamun.png", 
        info: "Syzygium cumini, commonly known as Malabar plum, Java plum, black plum, jamun, jaman, jambul, or jambolan, is an evergreen tropical tree."
    },
    { 
        name: "Cheeko (Sapota) cricket ball", 
        price: "Rs. 240", 
        image: "sapota.png", 
        info: "SAPOTA. Sapota (Achras zapota) commonly known as chiku is mainly cultivated in India for its fruit value, while in South-East Mexico, Guatemala and other countries it is commercially grown for the production of chickle which is a gum like substance obtained from latex and is mainly used for preparation of chewing gum."
    },
    { 
        name: "Coconut plant", 
        price: "Rs. 240", 
        image: "coconut.png", 
        info: "The coconut palm is a long-lived plant; it has a single trunk, 20-30 metre tall, its bark is smooth and gray, marked by ringed scars left by fallen leaf bases. The tree can live as long as 100 years producing an annual yield of 50 to 100 coconuts."
    }
    ,
    { 
        name: "Guava plant", 
        price: "Rs. 120", 
        image: "guava.png", 
        info: "Guava (Psidium guajava L.) is a small branched tree or shrub up to 7–10 m tall. The root system is superficial. The trunk is woody, hard, with a characteristic smooth, pale mottled bark that peels off in thin flakes, after the trunk has grown to about 20 cm in diameter."
    }
];

// Function to search and display plant details
document.getElementById('plant-search').addEventListener('input', function() {
    let searchQuery = this.value.toLowerCase();
    let resultsContainer = document.getElementById('search-results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter plants based on search query
    let filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(searchQuery));

    if (filteredPlants.length === 0) {
        resultsContainer.innerHTML = "<p>No plants found.</p>";
        return;
    }

    // Display results
    filteredPlants.forEach(plant => {
        let card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p><strong>Price:</strong> ${plant.price}</p>
            <p>${plant.info}</p>
            <div class="contact-icon" onclick="contactSeller('${plant.name}')">📞</div>
        `;

        resultsContainer.appendChild(card);
    });
});

// Contact Seller Function
function contactSeller(plantName) {
    window.open(`https://wa.me/9900897449?text=${encodeURIComponent(`Hello, I am interested in ${plantName}.`)}`, '_blank');
}
