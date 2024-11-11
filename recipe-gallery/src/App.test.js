import { render, screen } from '@testing-library/react';
import App from './App';
import RecipeGallery from './RecipeGallery';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Normal Test Cases

test('renders recipes correctly', () => {
  const recipes = [
    { id: 1, title: 'Recipe 1', ingredients: ['Ingredient 1', 'Ingredient 2'], image: 'image1.jpg' },
    { id: 2, title: 'Recipe 2', ingredients: ['Ingredient 3', 'Ingredient 4'], image: 'image2.jpg' }
  ];

  render(<RecipeGallery recipes={recipes} />);

  recipes.forEach(recipe => {
    expect(screen.getByText(recipe.title)).toBeInTheDocument();
    recipe.ingredients.forEach(ingredient => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
    expect(screen.getByAltText(recipe.title)).toHaveAttribute('src', recipe.image);
  });
});

test('displays recipe ingredients correctly', () => {
  const testRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      ingredients: ['Pasta', 'Eggs', 'Cheese', 'Bacon'],
      image: 'https://example.com/carbonara.jpg',
    },
    {
      id: 2,
      title: 'Chicken Alfredo',
      ingredients: ['Pasta', 'Chicken', 'Cheese', 'Cream'],
      image: 'https://example.com/alfredo.jpg',
    },
  ];

  render(<RecipeGallery recipes={testRecipes} />);

  testRecipes.forEach((recipe) => {

    expect(screen.getByText(recipe.title)).toBeInTheDocument();

    recipe.ingredients.forEach((ingredient) => {
      const ingredientElements = screen.getAllByText(ingredient);
      expect(ingredientElements.length).toBeGreaterThan(0); // Ensure that at least one instance is found
    });
  });
});

test('renders recipe images correctly', () => {
  const testRecipes = [{ id: 1, title: 'Recipe 1', ingredients: ['Pasta'], image: 'image.jpg' }];
  render(<RecipeGallery recipes={testRecipes} />);
  
  const img = screen.getByAltText('Recipe 1');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'image.jpg');
});

// Edge Test Cases

test('does not render anything when the recipes array is empty', () => {
  render(<RecipeGallery recipes={[]} />);
  const recipeCards = screen.queryAllByRole('listitem');
  expect(recipeCards).toHaveLength(0);  // Expect no list items to be rendered
});

test('renders recipe card even if ingredients are missing', () => {
  const recipeWithoutIngredients = { id: 1, title: 'Recipe 1', ingredients: [], image: 'image.jpg' };
  render(<RecipeGallery recipes={[recipeWithoutIngredients]} />);
  expect(screen.getByText(recipeWithoutIngredients.title)).toBeInTheDocument();  // Recipe title should be rendered
  expect(screen.queryByRole('list')).toBeEmptyDOMElement();  // Ingredients list should be empty
});

test('handles broken or invalid image URLs gracefully', () => {
  const recipeWithInvalidImage = { id: 1, title: 'Recipe 1', ingredients: ['Pasta', 'Cheese'], image: 'invalid-image.jpg' };
  render(<RecipeGallery recipes={[recipeWithInvalidImage]} />);
  const img = screen.getByAltText(recipeWithInvalidImage.title);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('alt', recipeWithInvalidImage.title);
  expect(img).toHaveAttribute('src', 'invalid-image.jpg');
});
