import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AddRecipeByLinkForm, { TEST_ATTRIBUTES } from "./index";
import api from "../../services/proxy";
import {Recipe} from "../../domains/recipes/models";
import DataProvider from "../../domains/data-provider";

const mockAddRecipe = (api.getScrapedRecipe = jest.fn())

const setup = () => {
  const utils = render(
    <DataProvider initialRecipes={{}}>
      <AddRecipeByLinkForm />
    </DataProvider>
  )

  const elements = {
    input: utils.getByTestId(TEST_ATTRIBUTES.INPUT),
    button: utils.getByTestId(TEST_ATTRIBUTES.BUTTON),
    form: utils.getByTestId(TEST_ATTRIBUTES.FORM)
  }

  return {
    ...elements,
    ...utils
  }
}

const mockRecipe: Recipe = {
  id: 'fgadfgadgf',
  title: 'Test'
}

const linkInputValue = 'https://www.jamieoliver.com/recipes/fish-recipes/cheats-fish-and-chips/'

describe('Successful submit is handled correctly', () => {
  beforeEach(() => {
    mockAddRecipe.mockResolvedValueOnce(mockRecipe)
  })

  test('API has been called with the right input', async () => {
    const { input, button } = setup()
    fireEvent.change(input, { target: { value: linkInputValue } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(api.getScrapedRecipe).toHaveBeenCalledWith(linkInputValue)
    })
  })

  test('Shows success message', async () => {
    const { input, button, getByTestId } = setup()
    fireEvent.change(input, { target: { value: linkInputValue } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(getByTestId(TEST_ATTRIBUTES.SUCCESS_MESSAGE)).toBeTruthy()
    })
  })
})

describe('Failed submit is handled correctly', () => {
  beforeEach(() => {
    mockAddRecipe.mockRejectedValueOnce(mockRecipe)
  })

  test('API has been called with the right input', async () => {
    const { input, button } = setup()
    fireEvent.change(input, { target: { value: linkInputValue } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(api.getScrapedRecipe).toHaveBeenCalledWith(linkInputValue)
    })
  })

  test('Shows error message', async () => {
    const { input, button, getByTestId } = setup()
    fireEvent.change(input, { target: { value: linkInputValue } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(getByTestId(TEST_ATTRIBUTES.ERROR_MESSAGE)).toBeTruthy()
    })
  })
})
