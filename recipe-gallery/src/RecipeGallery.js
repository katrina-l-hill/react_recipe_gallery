import React from 'react'

const recipes = [
    { id: 1, title: "Spaghetti Carbonara", ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"], image: "https://example.com/carbonara.jpg" },
    { id: 2, title: "Chicken Alfredo", ingredients: ["Pasta", "Chicken", "Cheese", "Cream"], image: "https://example.com/alfredo.jpg" },
    { id: 3, title: "Tamales", ingredients: ["Corn masa", "Meat filling", "Corn husks"], image: "https://example.com/tamales.jpg" },
    { id: 4, title: "Kimchi", ingredients: ["Cabbage", "Daikon radish", "Carrot", "Scallions", "Gochujang"], image: "https://example.com/kimchi.jpg" },
    { id: 5, title: "Jollof Rice", ingredients: ["Rice", "Tomato", "Onion", "Bell pepper", "Spices"], image: "https://example.com/jollof.jpg" },
    { id: 6, title: "Musubi", ingredients: ["Rice", "Spam", "Nori", "Soy sauce"], image: "https://example.com/musubi.jpg" },
    { id: 7, title: "Pad Thai", ingredients: ["Rice noodles", "Tofu", "Peanuts", "Bean sprouts", "Eggs", "Tamarind paste"], image: "https://example.com/padthai.jpg" },
    { id: 8, title: "Mapo Tofu", ingredients: ["Tofu", "Ground pork", "Chili bean paste", "Sichuan peppercorn"], image: "https://example.com/mapotofu.jpg" },
    { id: 9, title: "Soup Dumplings", ingredients: ["Dumpling wrapper", "Pork filling", "Gelatin broth"], image: "https://example.com/soupdumplings.jpg" },
    { id: 10, title: "Banh Mi", ingredients: ["Baguette", "Pork", "Pickled vegetables", "Cilantro", "Chili"], image: "https://example.com/banhmi.jpg" }
  ];

const RecipeGallery = ({ recipes }) => {
    //console.log(recipes);
    return (
        <div className="recipe-gallery">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                    <h3>{recipe.title}</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                    <img src={recipe.image} alt={recipe.title} />
                </div>
            ))}
        </div>
    );
};
  
  export default RecipeGallery;
  