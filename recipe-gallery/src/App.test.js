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
  
  // Check if the recipes are rendered
  recipes.forEach(recipe => {
    expect(screen.getByText(recipe.title)).toBeInTheDocument();
    recipe.ingredients.forEach(ingredient => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
    expect(screen.getByAltText(recipe.title)).toHaveAttribute('src', recipe.image);
  });
});

test('displays recipe ingredients correctly', () => {
  const recipe = { id: 1, title: 'Recipe 1', ingredients: ['Ingredient 1', 'Ingredient 2'], image: 'image1.jpg' };

  render(<RecipeGallery recipes={[recipe]} />);
  
  // Check if ingredients are displayed as list items
  recipe.ingredients.forEach(ingredient => {
    expect(screen.getByText(ingredient).tagName).toBe('LI');
  });
});

test('renders recipe images correctly', () => {
  render(<RecipeGallery recipes={[{ id: 1, title: 'Recipe 1', ingredients: ['Pasta'], image: 'image.jpg' }]} />);
  
  const img = screen.getByAltText('Recipe 1');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'image.jpg');
  expect(img).toHaveAttribute('alt', 'Recipe 1');
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
  expect(screen.queryByRole('list')).toBeEmpty();  // Ingredients list should be empty
});

test('handles broken or invalid image URLs gracefully', () => {
  const recipeWithInvalidImage = { id: 1, title: 'Recipe 1', ingredients: ['Pasta', 'Cheese'], image: 'invalid-image.jpg' };
  render(<RecipeGallery recipes={[recipeWithInvalidImage]} />);
  const img = screen.getByAltText(recipeWithInvalidImage.title);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('alt', recipeWithInvalidImage.title);
  expect(img).toHaveAttribute('src', 'invalid-image.jpg');  // Expect the invalid image source
});
