import string
from collections import Counter
import matplotlib.pyplot as plt

def build_letter_frequency(text):
    """
    Build a frequency dictionary of letters in the given text.
    Only counts English alphabet letters (a-z, case-insensitive).
    
    Args:
        text (str): Input text to analyze
        
    Returns:
        Counter: Dictionary-like object with letter frequencies
    """
    # Convert text to lowercase
    text = text.lower()
    
    # Filter only letters from the text
    letters = [char for char in text if char in string.ascii_lowercase]
    
    # Count letter frequencies
    frequency = Counter(letters)
    
    # Add missing letters with count 0
    for letter in string.ascii_lowercase:
        if letter not in frequency:
            frequency[letter] = 0
            
    return frequency

def plot_frequency(frequency):
    """
    Plot letter frequencies as a bar chart.
    
    Args:
        frequency (Counter): Letter frequency dictionary
    """
    letters = sorted(frequency.keys())
    counts = [frequency[letter] for letter in letters]
    
    plt.figure(figsize=(12, 6))
    plt.bar(letters, counts)
    plt.title('Letter Frequency Distribution')
    plt.xlabel('Letters')
    plt.ylabel('Frequency')
    plt.grid(True, alpha=0.3)
    plt.savefig('letter_frequency_plot.png')
    plt.close()

def main():
    # Example text (you can replace this with any text)
    sample_text = """
    The quick brown fox jumps over the lazy dog.
    Pack my box with five dozen liquor jugs.
    How vexingly quick daft zebras jump!
    The five boxing wizards jump quickly.
    """
    
    # Build frequency dictionary
    frequency = build_letter_frequency(sample_text)
    
    # Print results
    print("Letter Frequencies:")
    for letter in sorted(frequency.keys()):
        print(f"{letter}: {frequency[letter]}")
    
    # Plot the frequencies
    plot_frequency(frequency)
    
    # Calculate and print statistics
    total_letters = sum(frequency.values())
    print(f"\nTotal letters analyzed: {total_letters}")
    
    # Calculate percentages
    print("\nLetter Frequencies (%):")
    for letter in sorted(frequency.keys()):
        percentage = (frequency[letter] / total_letters) * 100 if total_letters > 0 else 0
        print(f"{letter}: {percentage:.2f}%")

if __name__ == "__main__":
    main() 