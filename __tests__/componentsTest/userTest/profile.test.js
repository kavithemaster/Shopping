import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Profile from "../../../src/components/user/profile";
import { ThemeProvider } from "react-native-elements";
import theme from "../../../src/styles/themes";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
    }),
}))

jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn(), get:jest.fn(),put:jest.fn() }));

describe("Profile", () => {
    beforeEach(() => {
        AsyncStorage.getItem.mockResolvedValue("userKey"); // Mock AsyncStorage getItem
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock function calls after each test
    });


    it("opens the edit profile modal when 'Edit Your Profile' is pressed", async () => {
        // const { getByTestId } = render(
        //     <ThemeProvider theme={theme}>
        //         <Profile />
        //     </ThemeProvider>
        // );
        const mockedResponse = { data: { UserName: "JohnDoe", Email: "johndoe@example.com", PhoneNumber: "1234567890" } };
        axios.get.mockResolvedValueOnce(mockedResponse);

        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Profile />
            </ThemeProvider>
        );
        const editButton = getByTestId("editJest");
        act(() => {
            fireEvent.press(editButton);
        })
    });

    it("updates the user data when the form is submitted", async () => {
        const mockedResponse = { data: { UserName: "abc", Email: "abc@exe.com", PhoneNumber: "9876543210" } };
        axios.put.mockResolvedValueOnce(mockedResponse);
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Profile />
            </ThemeProvider>
        );
        const editButton = getByTestId("editJest");
        fireEvent.press(editButton);
        await waitFor(() => {
            const userNameInput = getByTestId("ftUserJest");
            const phoneNumberInput = getByTestId("ftPhoneJest");
            const submitButton = getByTestId("submitJest");

            fireEvent.changeText(userNameInput, "John Doe");
            fireEvent.changeText(phoneNumberInput, "1234567890");
            fireEvent.press(submitButton);

            // Write your assertion here to check if the user data is updated
        });
    });

    it("logs out the user when 'Logout' is pressed", async () => {
        const { getByTestId, getByText } = render(
            <ThemeProvider theme={theme}>
                <Profile />
            </ThemeProvider>);
        const logoutButton = getByTestId("logoutJest");
        fireEvent.press(logoutButton);
        // await waitFor(() => {
        //     // const logoutAlert = getByTestId("logoutJest");
        //     const yesButton = getByText("Yes");
        //     fireEvent.press(yesButton);
        //     const noButton = getByText("No")
        //     fireEvent.press(noButton)

        //     // Write your assertion here to check if the user is logged out
        // });
    });

    // Add more tests to cover other parts of the code, if necessary
});
