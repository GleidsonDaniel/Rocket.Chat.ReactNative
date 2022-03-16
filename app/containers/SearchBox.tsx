import React from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput as RNTextInput,
	Text,
	TextInputFocusEventData,
	TextInputProps,
	View
} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import TextInput from '../presentation/TextInput';
import I18n from '../i18n';
import { CustomIcon } from '../lib/Icons';
import sharedStyles from '../views/Styles';
import { withTheme } from '../theme';
import { themes } from '../constants/colors';
import { isIOS } from '../utils/deviceInfo';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1
	},
	searchBox: {
		alignItems: 'center',
		borderRadius: 10,
		flexDirection: 'row',
		fontSize: 15,
		height: 36,
		margin: 16,
		marginVertical: 10,
		paddingHorizontal: 10,
		flex: 1
	},
	input: {
		flex: 1,
		fontSize: 15,
		marginLeft: 8,
		paddingTop: 0,
		paddingBottom: 0,
		...sharedStyles.textRegular
	},
	cancel: {
		marginRight: 15
	},
	cancelText: {
		...sharedStyles.textRegular,
		fontSize: 15
	}
});

interface ISearchBox {
	value?: string;
	onChangeText: TextInputProps['onChangeText'];
	onSubmitEditing?: () => void;
	hasCancel?: boolean;
	onCancelPress?: Function;
	theme?: string;
	inputRef?: React.Ref<RNTextInput>;
	testID?: string;
	onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const CancelButton = (onCancelPress: Function, theme: string) => (
	<Touchable onPress={onCancelPress} style={styles.cancel}>
		<Text style={[styles.cancelText, { color: themes[theme].headerTintColor }]}>{I18n.t('Cancel')}</Text>
	</Touchable>
);

const SearchBox = ({
	onChangeText,
	onSubmitEditing,
	testID,
	hasCancel,
	onCancelPress,
	inputRef,
	theme,
	...props
}: ISearchBox) => (
	<View
		style={[
			styles.container,
			{ backgroundColor: isIOS ? themes[theme!].headerBackground : themes[theme!].headerSecondaryBackground }
		]}>
		<View style={[styles.searchBox, { backgroundColor: themes[theme!].searchboxBackground }]}>
			<CustomIcon name='search' size={14} color={themes[theme!].auxiliaryText} />
			<TextInput
				ref={inputRef}
				autoCapitalize='none'
				autoCorrect={false}
				blurOnSubmit
				clearButtonMode='while-editing'
				placeholder={I18n.t('Search')}
				returnKeyType='search'
				style={styles.input}
				testID={testID}
				underlineColorAndroid='transparent'
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				theme={theme!}
				{...props}
			/>
		</View>
		{hasCancel ? CancelButton(onCancelPress!, theme!) : null}
	</View>
);

export default withTheme(SearchBox);
