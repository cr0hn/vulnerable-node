import os

def insecure_file_access(filename):
    if filename.endswith(".txt"):
        with open(filename, "r") as file:
            content = file.read()
            print("File contents:", content)

if __name__ == "__main__":
    user_input = input("Enter a file name: ")
    insecure_file_access(user_input)
