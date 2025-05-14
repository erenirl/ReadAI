/* eslint-disable prettier/prettier */
import { useActionSheet } from '@expo/react-native-action-sheet';
import { FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LegendList } from '@legendapp/list';
import { Button, useHeaderHeight } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
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
  Modal,
  Pressable
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
  return <RNButton color={color ?? colors.grey} {...props} />;
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
  pdfInput?: string;    // Optional pdfUrl
  component: React.FC<{ bookName?: string; authorName?: string; pdfInput?: string }>;
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
      {/* Does bookName and authorName work correctly? */}
      <item.component bookName={item.bookName} authorName={item.authorName} pdfInput={item.pdfInput} />
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


//Books code
const COMPONENTS: ComponentItem[] = [
  {
    name: '1984',
    bookName: '1984',
    authorName: 'George Orwell',
    component: function Component({ bookName, authorName, pdfInput }) {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const { colors } = useColorScheme();
  
    return (
      <View className="flex-row items-center justify-between">
        <Link href="/bookscreen" asChild>
          <TouchableOpacity className="flex-row items-left gap-4">
            
            {/* BookCover */}
            <Link
              href={{ pathname: '/pdfscreen', params: { pdfUrl: pdfInput } }}
              asChild
            >
              <TouchableOpacity>
                <Image
                  source={{
                    uri: 'https://img.kitapyurdu.com/v1/getImage/fn:11484453/wh:true/miw:200/mih:200',
                  }}
                  style={{ width: 90, height: 130, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </Link>
  
            {/* Right side: Texts and Icons */}
          <View className="flex-1 ml-2 gap-3 justify-between">
            <View className="flex-col">
              <Text className="text-lg font-semibold">{bookName}</Text>
              <Text className="text-sm text-gray-500">{authorName}</Text>
            </View>

              {/* Icons */}
              <View className="flex-col gap-3">
              <View className="flex-row items-center space-x-10 gap-6">
                <TouchableOpacity>
                <FontAwesome name="star-o" size={25} color={colors.grey} />
                </TouchableOpacity>
                <TouchableOpacity>
                <FontAwesome5 name="clock" size={25} color={colors.grey} />
                </TouchableOpacity>
                <TouchableOpacity>
                <MaterialCommunityIcons name="read" size={25} color={colors.grey} />
                </TouchableOpacity>
                <TouchableOpacity>
                <MaterialIcons name="library-add" size={25} color={colors.grey} />
                </TouchableOpacity>
                {/*<TouchableOpacity>
                 <MaterialIcons name="library-add-check" size={25} color={colors.grey} />
                </TouchableOpacity> */}

                <TouchableOpacity>{/* onPress={() => setMenuVisible(true)} */}
                  <MaterialCommunityIcons name="dots-vertical" size={25} color={colors.grey} />
                </TouchableOpacity>
              </View>
  
              {/* ProgressBar */}
              <ProgressIndicator value={50} />
            </View>
          </View>
            {/* Dropboxmenu */}
        </TouchableOpacity>
        </Link>
        </View>
      );
    },
  },
];
