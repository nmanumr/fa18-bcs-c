.PHONY: build-apk

build-apk:
	ionic cordova build --release android
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk nmanumr
	rm -f ./ClassResources.apk
	zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ClassResources.apk

gen-key:
	keytool -genkey -v -keystore my-release-key.keystore -alias nmanumr -keyalg RSA -keysize 2048 -validity 10000