import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MainLayout } from '@/components/ui/MainLayout';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/lib/theme';
import { chatStyles } from '@/lib/styles';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function NewChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Responsive layout: 25% margins on desktop/web, full width on mobile
  const isLargeScreen = width >= 768; // Tablet/desktop breakpoint
  const horizontalPadding = isLargeScreen ? width * 0.125 : 16; // 25% margins or 16px padding
  const [inputHeight, setInputHeight] = useState(40); // default height



  // Dummy AI responses for demonstration
  const aiResponses = [
    "Hello! I'm a demo AI assistant. How can I help you today?",
    "That's an interesting question! This is just a placeholder response.",
    "I understand what you're asking. In a real implementation, this would connect to an actual AI service.",
    "Thanks for your message! This chat interface is fully functional and ready for integration.",
    "Feel free to keep testing the interface. The input grows as you type longer messages!",
    "This is a sample response to demonstrate the chat functionality. Pretty neat, right?",
  ];

  const getRandomResponse = () => {
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
  };

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setInputHeight(40);


    // Scroll to bottom after user message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Scroll to bottom after AI response
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        chatStyles.messageBubble,
        message.isUser ? chatStyles.userBubble : chatStyles.aiBubble,
      ]}
    >
      <Text
        style={message.isUser ? chatStyles.userMessageText : chatStyles.aiMessageText}
      >
        {message.text}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={chatStyles.emptyState}>
      <Text style={chatStyles.emptyStateText}>Welcome to New Chat</Text>
      <Text style={chatStyles.emptyStateSubtext}>
        Start a conversation by typing a message below
      </Text>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[chatStyles.messageBubble, chatStyles.aiBubble]}>
      <Text style={chatStyles.aiMessageText}>AI is typing...</Text>
    </View>
  );

  return (
    <MainLayout>
      <KeyboardAvoidingView
        style={[chatStyles.centeredContainer, { paddingHorizontal: horizontalPadding }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages Area */}
        <ScrollView
          ref={scrollViewRef}
          style={chatStyles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {messages.length === 0 ? renderEmptyState() : (
            <>
              {messages.map(renderMessage)}
              {isTyping && renderTypingIndicator()}
            </>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={chatStyles.inputContainer}>
          <View style={chatStyles.inputWrapper}>
            <TextInput
              style={[
                chatStyles.textInput,
                {
                  color: colors.text,
                  height: Math.max(40, inputHeight),
                },
              ]}
              placeholder="Type your message..."
              placeholderTextColor={colors.gray500}
              value={inputText}
              onChangeText={setInputText}
              onContentSizeChange={(e) =>
                setInputHeight(e.nativeEvent.contentSize.height)
              }
              multiline
              textAlignVertical="top"
              blurOnSubmit={false}
              returnKeyType="send"
              onSubmitEditing={() => {
                if (!isTyping && inputText.trim()) {
                  sendMessage();
                }
              }}
            />
            <TouchableOpacity
              style={chatStyles.sendButton}
              onPress={sendMessage}
              disabled={inputText.trim().length === 0}
              activeOpacity={0.7}
            >
              <Ionicons name="send" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </MainLayout>
  );
} 