import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split

# Load dataset
train = pd.read_csv("dataset/sign_mnist_train.csv")

y = train["label"]
X = train.drop("label", axis=1)

# Normalize
X = X / 255.0
X = X.values.reshape(-1, 28, 28, 1)

# One-hot encode labels
y = keras.utils.to_categorical(y)

# Split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2)

# CNN model
model = keras.Sequential([
    keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
    keras.layers.MaxPooling2D(2,2),

    keras.layers.Conv2D(64, (3,3), activation='relu'),
    keras.layers.MaxPooling2D(2,2),

    keras.layers.Flatten(),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(25, activation='softmax')  # 25 letters
])

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.fit(X_train, y_train,
          validation_data=(X_val, y_val),
          epochs=10)

model.save("model.h5")
print("Model saved!")