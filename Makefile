prepare:
	cargo install cbindgen
	touch cbindgen.toml
	rustup target add aarch-64-apple-ios
	rustup target add aarch-64-apple-ios-sim
	mkdir wrappers/javascript/react-native/ios/Frameworks

header:
	cbindgen --config cbindgen.toml --output rust_header.h ./libindy_vdr

ios-build: 
	cargo build --package indy-vdr --all-features --release --target aarch64-apple-ios
	cargo build --package indy-vdr --all-features --release --target aarch64-apple-ios-sim

ios-xcframework:
	xcodebuild -create-xcframework \
				 		 -library ./target/aarch64-apple-ios/release/libindy_vdr.a     -headers rust_header.h \
				 		 -library ./target/aarch64-apple-ios-sim/release/libindy_vdr.a -headers rust_header.h \
				 		 -output  ./ios/libindy-vdr.xcframework

ios-relocate:
	mv ./ios/libindy-vdr.xcframework ./indy-vdr/wrappers/javascript/react-native/ios/Frameworks

android-build:
	cargo build --release --target aarch64-linux-android
	cargo build --release --target armv7-linux-androideabi
	cargo build --release --target x86_64-linux-android
	cargo build --release --target i686-linux-android

android-relocate:
	mkdir ./android/libs/
	mkdir ./android/libs/x86/
	mkdir ./android/libs/x86_64/
	mkdir ./android/libs/armeabi-v7a/
	mkdir ./android/libs/arm64-v8a/
	mv ./target/aarch64-linux-android/release/libmultiply.a ./android/libs/arm64-v8a
	mv ./target/armv7-linux-androideabi/release/libmultiply.a ./android/libs/armeabi-v7a
	mv ./target/x86_64-linux-android/release/libmultiply.a ./android/libs/x86_64
	mv ./target/i686-linux-android/release/libmultiply.a ./android/libs/x86
	cp -r ./android/libs ../android
	cp ./rust_header.h ../cpp/rust_multiply.h

android-all: header android-build android-relocate 

ios-all: header ios-build ios-xcframework ios-relocate
