/* eslint-disable prettier/prettier */
import { useActionSheet } from '@expo/react-native-action-sheet';
import { LegendList } from '@legendapp/list';
import { Button, useHeaderHeight } from '@react-navigation/elements';
import { Icon } from '@roninoss/icons';
import { Link } from 'expo-router'; // Link bileşenini ekleyin
import * as StoreReview from 'expo-store-review';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import {
  Button as RNButton,
  ButtonProps,
  Linking,
  Platform,
  Share,
  useWindowDimensions,
  View,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { ProgressIndicator } from '~/components/nativewindui/ProgressIndicator';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { Text } from '~/components/nativewindui/Text';
import { Toggle } from '~/components/nativewindui/Toggle';
import { useColorScheme } from '~/lib/useColorScheme';
import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';

cssInterop(LegendList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

function DefaultButton({ color, ...props }: ButtonProps) {
  const { colors } = useColorScheme();
  return <RNButton color={color ?? colors.primary} {...props} />;
}

export default function Screen() {
  const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });

  const data = searchValue
    ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
    : COMPONENTS;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* LegendList */}
      <LegendList
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={data}
        estimatedItemSize={200}
        contentContainerClassName="py-4 android:pb-12"
        extraData={searchValue}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={renderItem}
        ListEmptyComponent={COMPONENTS.length === 0 ? ListEmptyComponent : undefined}
        recycleItems
      />
    </SafeAreaView>
  );
}

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return (
    <SafeAreaView style={{ height }} className="flex-1 items-center justify-center gap-1 px-12">
      <Icon name="file-plus-outline" size={42} color={colors.grey} />
      <Text variant="title3" className="pb-1 text-center font-semibold">
        No Components Installed
      </Text>
      <Text color="tertiary" variant="subhead" className="pb-4 text-center">
        You can install any of the free components from the{' '}
        <Text
          onPress={() => Linking.openURL('https://nativewindui.com')}
          variant="subhead"
          className="text-primary">
          NativeWindUI
        </Text>
        {' website.'}
      </Text>
    </SafeAreaView>
  );
}

type ComponentItem = {
  name: string;
  bookName?: string;  // Optional bookName
  authorName?: string; // Optional authorName
  uri?: string;        // Optional uri
  component: React.FC<{ bookName?: string; authorName?: string }>;
};

function keyExtractor(item: ComponentItem) {
  return item.name;
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderItem({ item }: { item: ComponentItem }) {
  return (
    <Card title={item.name}>
      {/* bookName ve authorName doğru şekilde geçiyor mu? */}
      <item.component bookName={item.bookName} authorName={item.authorName} />
    </Card>
  );
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View className="px-4">
      <View className="gap-1 rounded-xl border border-border bg-card p-4 pb-6 shadow shadow-black/100 dark:shadow-hidden">
        {children}
      </View>
    </View>
  );
}

let hasRequestedReview = false;


//Kitaplar kodu
const COMPONENTS: ComponentItem[] = [
  {
    name: '1984',
    bookName: '1984',
    authorName: 'George Orwell',
    component: ({ bookName, authorName }) => (
      <Link href="/bookscreen" asChild>
      <TouchableOpacity className="flex-row">
        
        {/* Sadece resme özel link */}
        <Link href="/pdfscreen" asChild>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://img.kitapyurdu.com/v1/getImage/fn:11484453/wh:true/miw:200/mih:200',
              }}
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </Link>

        {/* Yazılar ve progress */}
        <View className="flex-1 justify-between">
          <Text className="text-lg font-semibold">{bookName}</Text>
          <Text className="text-sm text-gray-500">{authorName}</Text>
          <ProgressIndicator value={50} />
        </View>
      </TouchableOpacity>
    </Link>
    ),
  },
  {
    name: 'Mustafa Kemal Atatürk',
    bookName: 'Nutuk',
    authorName: 'Mustafa Kemal Atatürk',
    component: function TextExample() {
      return (
        <View className="flex-row">
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://img.kitapyurdu.com/v1/getImage/fn:4060202/wh:true/wi:800',
              }}
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <View className="flex-1  flex-col justify-between ml-4">
          <Text className="text-lg font-semibold"> Nutuk </Text>
            <View>
              <ProgressIndicator value={85} />
            </View>
          </View>
        </View>
      );
    },
  },
  {
    name: 'Daniel Kahneman',
    bookName: 'Thinking, Fast and Slow',
    authorName: 'Daniel Kahneman',
    component: function TextExample() {
      return (
        <View className="flex-row gap-2">
            <TouchableOpacity>
            <Image
              source={{
                uri: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg',
              }}
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
            </TouchableOpacity>
            <View className="flex-1 flex-col justify-between ml-4">
          <Text className="text-lg font-semibold"> Thinking, Fast and Slow </Text>
            <View>
              <ProgressIndicator value={9} />
            </View>
          </View>
        </View>
      );
    },
  },
  {
    name: 'James Clear',
    bookName: 'Atomic Habits',
    authorName: 'James Clear',
    component: function TextExample() {
      return (
        <View className="flex-row gap-2">
            <TouchableOpacity onPress={() => Alert.alert('Resme tıklandı!')}>
            <Image
              source={{
              uri: 'https://m.media-amazon.com/images/I/81ANaVZk5LL._AC_UF1000,1000_QL80_.jpg',
              }}
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
            </TouchableOpacity>
            <View className="flex-1 flex-col justify-between ml-4">
          <Text className="text-lg font-semibold"> Atomic Habits </Text>
            <View>
              <ProgressIndicator value={5} />
            </View>
          </View>
        </View>
      );
    },
  },
];
